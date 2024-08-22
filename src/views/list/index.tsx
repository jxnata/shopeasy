import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Icon from '../../components/icon'
import Input from '../../components/input'
import ItemRow from '../../components/item'
import ListFooter from '../../components/list-footer'
import Options from '../../components/options'
import { Progress } from '../../components/progress'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { createShoppingList, deleteShoppingList, updateShoppingList } from '../../database/models/lists'
import { useCart } from '../../hooks/cart'
import { useShoppingList } from '../../hooks/local/useShoppingList'
import { Button, ButtonIcon, ButtonLabel, Container, Label } from '../../theme/global'
import { ShoppingListData } from '../../types/models/shopping-list'
import { format } from '../../utils/format'

function ListView({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined
	const listId = useMemo(() => (listParam ? listParam.id : undefined), [listParam])

	const { current } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])

	const { t } = useTranslation('translation', { keyPrefix: 'list' })
	const [name, setName] = useState<string>('')
	const [optionsOpen, setOptionsOpen] = useState(false)

	const list = useShoppingList(listId)

	const items = useMemo(() => {
		if (!list) return []

		return [...list.items].sort((a, b) => {
			if (a.checked !== b.checked) return a.checked ? 1 : -1
			return a.name.localeCompare(b.name)
		})
	}, [list])

	const { percentage, total } = useCart(items)

	const itemsList = useMemo(() => items.map(i => i.name), [items])

	const toggle = useCallback(() => setOptionsOpen(old => !old), [])

	const onAdd = () => {
		if (!list) return
		navigation.navigate('add', { items: itemsList, listId: list.id })
	}

	const onRename = () => {
		if (!list) return
		setOptionsOpen(false)
		navigation.navigate('rename', { list })
	}

	const onDelete = async () => {
		if (!list) return
		try {
			deleteShoppingList(list.id)
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
		if (!currentId || !name) return

		try {
			const data: ShoppingListData = {
				name,
				finished: false,
				items: [],
				local: name,
				total: 0,
			}

			const created = createShoppingList(data)

			navigation.setParams({ list: created })
		} catch {
			toast.error(t('create_error'))
		}
	}

	const onFinish = () => {
		if (!list) return
		updateShoppingList(list.id, { finished: true })
	}

	const HeaderRight = useCallback(() => {
		return (
			<S.GhostButton onPress={toggle}>
				<Icon name='ellipsis-vertical' />
			</S.GhostButton>
		)
	}, [toggle])

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header title={list ? list.name : t('title')} Right={list ? HeaderRight : undefined} />
					{!list && !listParam && (
						<>
							<Input
								label={t('list_name')}
								value={name}
								onChangeText={setName}
								placeholder={t('list_name')}
								maxLength={32}
								autoFocus={items.length === 0}
								onSubmitEditing={onSave}
								returnKeyType='done'
							/>
						</>
					)}
					{!!list && (
						<S.AddButton onPress={onAdd}>
							<Icon name='add-circle' />
							<Label>{t('add_items')}</Label>
						</S.AddButton>
					)}
					<FlatList
						data={items}
						keyExtractor={item => item.id}
						renderItem={({ item }) => <ItemRow item={item} listId={listId!} />}
						ListFooterComponent={<ListFooter />}
						showsVerticalScrollIndicator={false}
						style={{ marginBottom: 12 }}
					/>
					{!list && (
						<Button disabled={!name} onPress={onSave}>
							<ButtonLabel>{t('create_button')}</ButtonLabel>
						</Button>
					)}
					{list && (
						<S.Cart>
							<S.CartLeft>
								<S.CartTotal>
									<S.Total>{t('total')}</S.Total>
									<Label>{format(total)}</Label>
								</S.CartTotal>
								<Progress percentage={percentage} />
							</S.CartLeft>
							{!list.finished && (
								<S.FinishButton onPress={onFinish}>
									<ButtonIcon name='checkmark-circle' />
									<ButtonLabel>{t('finish')}</ButtonLabel>
								</S.FinishButton>
							)}
						</S.Cart>
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
