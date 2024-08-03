import Geolocation from '@react-native-community/geolocation'
import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import Input from '../../components/input'
import ItemShopRow from '../../components/item-shop'
import Loading from '../../components/loading'
import Options from '../../components/options'
import { Progress } from '../../components/progress'
import { toast } from '../../components/toast'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useCart } from '../../hooks/cart'
import { useDocument, useDocuments } from '../../hooks/documents'
import { databases, queries } from '../../lib/appwrite'
import { ButtonIcon, ButtonLabel, Container, Label } from '../../theme/global'
import { Item } from '../../types/models/item'
import { List } from '../../types/models/list'
import { Local } from '../../types/models/local'
import { format } from '../../utils/format'

function ShopView({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined
	const listId = useMemo(() => (listParam ? listParam.$id : undefined), [listParam])
	// const itemsToCopy = route.params ? route.params.items : []

	const { current } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])

	const { t } = useTranslation('translation', { keyPrefix: 'shop' })

	const queryClient = useQueryClient()

	const { data: list, mutate } = useDocument<List>({
		queryKey: ['list', listId],
		initialData: listParam,
		enabled: !!listId,
		queryFn: async () => await databases.getDocument(DB, MODELS.LIST, listId!),
	})

	const [name, setName] = useState<string>(listParam ? listParam.name || '' : '')
	const [displayTip, setDisplayTip] = useState(true)
	const [editName, setEditName] = useState(false)
	const [optionsOpen, setOptionsOpen] = useState(false)

	const diplayInput = useMemo(() => (list && !list.name) || editName, [list, editName])

	const { data: items, mutate: mutateItems } = useDocuments<Item<List, Local>[]>({
		queryKey: ['items-shop', listId],
		initialData: [],
		enabled: !!listId && !!currentId,
		queryFn: async () => await databases.listDocuments(DB, MODELS.LIST, queries.itemsByListToShop(listId)),
	})

	const { percentage, total } = useCart(items)

	const toggle = useCallback(() => setOptionsOpen(old => !old), [])
	const closeTip = () => setDisplayTip(false)

	const onRename = () => {
		setOptionsOpen(false)
		setEditName(old => !old)
	}

	const onDelete = async () => {
		if (!list) return
		try {
			await databases.deleteDocument(DB, MODELS.LIST, list.$id)
			queryClient.invalidateQueries({ queryKey: ['lists-shop', currentId] })
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

	const onSetName = async () => {
		if (!current || !name || !list) return

		try {
			await databases.updateDocument(DB, MODELS.LIST, list.$id, { name })
			mutate()
			queryClient.invalidateQueries({ queryKey: ['lists-shop', currentId] })
			setEditName(false)
		} catch {
			toast.error(t('update_name_error'))
		}
	}

	const HeaderRight = useCallback(() => {
		return (
			<S.GhostButton onPress={toggle}>
				<Icon name='ellipsis-vertical' />
			</S.GhostButton>
		)
	}, [toggle])

	const displayCategory = useCallback(
		(index: number) => {
			if (index === 0) return true

			const item = items[index]
			const prevItem = items[index - 1]
			return item.category !== prevItem.category
		},
		[items]
	)

	useEffect(() => {
		if (!list) return

		navigation.setOptions({ title: list.name || t('title'), headerRight: HeaderRight })
	}, [HeaderRight, navigation, list, t])

	useEffect(() => {
		Geolocation.getCurrentPosition(info => console.tron.log(info))
		setTimeout(() => {
			setDisplayTip(false)
		}, 5000)
	}, [])

	if (!list) return <Loading />

	return (
		<Container>
			<S.Content>
				{diplayInput && (
					<S.Header>
						<Input
							label={t('shop_name_label')}
							value={name}
							onChangeText={setName}
							placeholder={t('shop_name')}
							maxLength={32}
							autoFocus={items.length === 0}
							onSubmitEditing={onSetName}
							returnKeyType='done'
						/>
					</S.Header>
				)}
				{!!list && (
					<S.Body>
						<FlatList
							data={items}
							keyExtractor={item => item.$id}
							renderItem={({ item, index }) => (
								<ItemShopRow
									item={item}
									displayCategory={displayCategory(index)}
									mutate={mutateItems}
								/>
							)}
							showsVerticalScrollIndicator={false}
							style={{ marginBottom: 12 }}
							ListHeaderComponent={
								<>
									{displayTip && (
										<S.TipContainer onPress={closeTip}>
											<Icon name='information-circle' />
											<S.Tip>{t('tip_text')}</S.Tip>
										</S.TipContainer>
									)}
									<S.ListHeader>
										<S.Text>{t('list_item')}</S.Text>
										<S.Text>{t('list_price')}</S.Text>
									</S.ListHeader>
								</>
							}
						/>
						<S.Cart>
							<S.CartLeft>
								<S.CartTotal>
									<S.Total>{t('total')}</S.Total>
									<Label>{format(total)}</Label>
								</S.CartTotal>
								<Progress percentage={percentage} />
							</S.CartLeft>
							<S.FinishButton>
								<ButtonIcon name='checkmark-circle' />
								<ButtonLabel>{t('finish')}</ButtonLabel>
							</S.FinishButton>
						</S.Cart>
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
				)}
			</S.Content>
		</Container>
	)
}

export default ShopView
