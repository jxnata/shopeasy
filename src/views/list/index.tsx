import { useQueryClient } from '@tanstack/react-query'
import { ID } from 'appwrite'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { useDocument, useDocuments } from '../../hooks/documents'
import { databases, queries } from '../../lib/appwrite'
import { Button, ButtonIcon, ButtonLabel, Container, Label } from '../../theme/global'
import { Item } from '../../types/models/item'
import { List } from '../../types/models/list'
import { getPermissions } from '../../utils/get-permissions'

function ListView({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined
	const listId = useMemo(() => (listParam ? listParam.$id : undefined), [listParam])

	const { current } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])

	const { t } = useTranslation('translation', { keyPrefix: 'list' })
	const [name, setName] = useState<string>('')
	const [optionsOpen, setOptionsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { data: list } = useDocument<List>({
		queryKey: ['list', listId],
		initialData: listParam,
		enabled: !!listId,
		queryFn: async () => await databases.getDocument(DB, MODELS.LIST, listId!),
	})

	const {
		data: items,
		total: size,
		mutate,
	} = useDocuments<Item<string, undefined>[]>({
		queryKey: ['items', listId],
		initialData: [],
		enabled: !!listId && !!currentId,
		queryFn: async () => await databases.listDocuments(DB, MODELS.ITEM, queries.itemsBylist(listId)),
	})

	const itemsList = useMemo(() => items.map(i => i.name), [items])

	const toggle = useCallback(() => setOptionsOpen(old => !old), [])

	const onAdd = () => {
		if (!list) return
		navigation.navigate('add', { items: itemsList, listId: list.$id })
	}

	const onShop = async () => {
		if (!list || !currentId || !size) return

		const data = {
			name,
			model: false,
			user: currentId,
		}

		const copy: List = await databases.createDocument(DB, MODELS.LIST, ID.unique(), data, getPermissions(currentId))

		navigation.replace('shop', { list: copy, items })
	}

	const onRename = () => {
		if (!list) return
		setOptionsOpen(false)
		navigation.navigate('rename', { list })
	}

	const onDelete = async () => {
		if (!list) return
		try {
			await databases.deleteDocument(DB, MODELS.LIST, list.$id)
			queryClient.invalidateQueries({ queryKey: ['lists', currentId] })
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
			const data = {
				name,
				model: true,
				user: currentId,
			}

			const created: List = await databases.createDocument(
				DB,
				MODELS.LIST,
				ID.unique(),
				data,
				getPermissions(currentId)
			)
			queryClient.invalidateQueries({ queryKey: ['lists', currentId] })
			navigation.setParams({ list: created })
		} catch {
			toast.error(t('create_error'))
		}
	}

	const displayCategory = useCallback(
		(index: number) => {
			if (index === 0) return true

			const item = items[index]
			const prevItem = items[index - 1]
			return item.category !== prevItem.category
		},
		[items]
	)

	const HeaderRight = useCallback(() => {
		return (
			<S.GhostButton onPress={toggle}>
				<Icon name='ellipsis-vertical' />
			</S.GhostButton>
		)
	}, [toggle])

	useEffect(() => {
		if (list) navigation.setOptions({ title: list.name, headerRight: HeaderRight })
	}, [HeaderRight, list, navigation])

	return (
		<Container>
			<S.Content>
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
					{!!list && (
						<S.AddButton onPress={onAdd}>
							<Icon name='add-circle' />
							<Label>{t('add_items')}</Label>
						</S.AddButton>
					)}
					<FlatList
						data={items}
						keyExtractor={item => item.$id}
						renderItem={({ item, index }) => (
							<ItemRow item={item} displayCategory={displayCategory(index)} mutate={mutate} />
						)}
						showsVerticalScrollIndicator={false}
						style={{ marginBottom: 12 }}
					/>
					{!list && (
						<Button disabled={!name}>
							<ButtonLabel>{t('create_button')}</ButtonLabel>
						</Button>
					)}
					{!!list && items.length > 0 && (
						<Button onPress={onShop}>
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
