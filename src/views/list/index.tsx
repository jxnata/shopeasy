import { ID } from 'appwrite'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import Input from '../../components/input'
import ItemRow from '../../components/item'
import Options from '../../components/options'
import { toast } from '../../components/toast'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useItems } from '../../hooks/items'
import { useLists } from '../../hooks/lists'
import { useViewList } from '../../hooks/lists/view'
import { databases } from '../../lib/appwrite'
import { getListQuery } from '../../lib/appwrite/queries/list-query'
import { getUserQuery } from '../../lib/appwrite/queries/user-query'
import { Button, ButtonIcon, ButtonLabel, Container, Label } from '../../theme/global'
import { List } from '../../types/models/list'
import { getPermissions } from '../../utils/getPermissions'

function ListView({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined

	const { current } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'list' })
	const [listId, setListId] = useState<string | undefined>(listParam ? listParam.$id : undefined)
	const { list } = useViewList(listId, listParam)
	const [name, setName] = useState<string>('')
	const [optionsOpen, setOptionsOpen] = useState(false)

	const userQueries = getUserQuery(current ? current.$id : undefined)

	const { mutate: mutateLists } = useLists(userQueries, !current)

	const queries = getListQuery(list ? list.$id : undefined)
	const disabled = !list || !current

	const { items, mutate } = useItems(queries, disabled)

	const itemsList = useMemo(() => items.map(i => i.name), [items])

	const toggle = () => setOptionsOpen(old => !old)

	const onAdd = () => {
		if (!list) return
		navigation.navigate('add', { items: itemsList, listId: list.$id, queries })
	}

	const onRename = () => {
		if (!list) return
		setOptionsOpen(false)
		navigation.navigate('rename', { list })
	}

	const onDelete = async () => {
		if (!list) return
		try {
			await databases.deleteDocument(DB, MODELS.LISTS, list.$id)
			mutateLists()
			navigation.goBack()
		} catch {
			toast.error(t('delete_error'))
		}
	}

	const onConfirmDelete = () => {
		setOptionsOpen(false)
		Alert.alert(t('delete_title'), t('delete_text'), [
			{
				text: t('cancel'),
				style: 'cancel',
			},
			{
				text: t('delete_confirm'),
				onPress: onDelete,
				style: 'default',
			},
		])
	}

	const onSave = async () => {
		if (!current || !name) return

		try {
			const created: List = await databases.createDocument(
				DB,
				MODELS.LISTS,
				ID.unique(),
				{ name, user: current.$id },
				getPermissions(current.$id)
			)
			mutateLists()
			setListId(created.$id)
		} catch {
			toast.error(t('create_error'))
		}
	}

	return (
		<Container>
			<S.Content>
				<S.Header>
					<S.Title>{list ? list.name : t('title')}</S.Title>
					{!!list && (
						<S.GhostButton onPress={toggle}>
							<Icon name='ellipsis-vertical' />
						</S.GhostButton>
					)}
				</S.Header>
				<S.Body>
					{!list && (
						<Input
							value={name}
							onChangeText={setName}
							placeholder={t('list_name')}
							maxLength={32}
							autoFocus={items.length === 0}
							onSubmitEditing={onSave}
							returnKeyType='done'
						/>
					)}
					{list && (
						<S.AddButton onPress={onAdd}>
							<Icon name='add-circle' />
							<Label>{t('add_items')}</Label>
						</S.AddButton>
					)}
					<FlatList
						data={items}
						keyExtractor={item => item.$id}
						renderItem={({ item }) => <ItemRow item={item} mutate={mutate} />}
						showsVerticalScrollIndicator={false}
						style={{ marginBottom: 12 }}
					/>
					{!list && (
						<Button disabled={!name}>
							<ButtonLabel>{t('create_button')}</ButtonLabel>
						</Button>
					)}
					{list && items.length && (
						<Button>
							<ButtonLabel>{t('shop_now_button')}</ButtonLabel>
							<ButtonIcon name='cart' />
						</Button>
					)}
					<Options open={optionsOpen} onClose={toggle}>
						<S.OptionButton onPress={onRename}>
							<Icon name='create' />
							<Label>{t('edit_option')}</Label>
						</S.OptionButton>
						<S.OptionButton onPress={onConfirmDelete}>
							<Icon name='trash' />
							<Label>{t('delete_option')}</Label>
						</S.OptionButton>
					</Options>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default ListView
