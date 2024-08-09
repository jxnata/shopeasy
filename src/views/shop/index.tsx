import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Banner from '../../components/banner'
import CopyItems from '../../components/copy-items'
import Icon from '../../components/icon'
import ItemShopRow from '../../components/item-shop'
import ListFooter from '../../components/list-footer'
import Loading from '../../components/loading'
import Options from '../../components/options'
import { Progress } from '../../components/progress'
import ShopLocal from '../../components/shop-local'
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
	const itemsToCopy = useMemo(() => (route.params && route.params.items ? route.params.items : []), [route.params])

	const { current, loading } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])

	const { t } = useTranslation('translation', { keyPrefix: 'shop' })

	const queryClient = useQueryClient()

	const { data: list } = useDocument<List>({
		queryKey: ['list', listId],
		initialData: listParam,
		enabled: !!listId,
		queryFn: async () => await databases.getDocument(DB, MODELS.LIST, listId!),
	})

	const [optionsOpen, setOptionsOpen] = useState(false)

	const { data: items, mutate: mutateItems } = useDocuments<Item<List, Local>[]>({
		queryKey: ['items-shop', listId],
		initialData: [],
		enabled: !!listId && !!currentId,
		queryFn: async () => await databases.listDocuments(DB, MODELS.ITEM, queries.itemsByListToShop(listId)),
	})

	const { percentage, total } = useCart(items)

	const toggle = useCallback(() => setOptionsOpen(old => !old), [])

	const onRename = () => {
		setOptionsOpen(false)
	}

	const onFinish = async () => {
		if (!list) return
		try {
			await databases.updateDocument(DB, MODELS.LIST, list.$id, { total: total * 100, finished: true })
			queryClient.invalidateQueries({ queryKey: ['lists-shop', currentId] })
			navigation.goBack()
		} catch {
			toast.error(t('finish_error'))
		}
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
		if (!list) return
		if (!list.local) return

		navigation.setOptions({ title: list.local.name || t('title'), headerRight: HeaderRight })
	}, [HeaderRight, navigation, list, t])

	if (!list || loading) return <Loading />

	if (!list.local) return <ShopLocal list={list} />

	if (!list.qty && itemsToCopy.length) return <CopyItems items={itemsToCopy} listId={list.$id} local={list.local} />

	return (
		<Container>
			<S.Content>
				<S.Body>
					<FlatList
						data={items}
						keyExtractor={item => item.$id}
						renderItem={({ item, index }) => (
							<ItemShopRow
								item={item}
								displayCategory={displayCategory(index)}
								finished={list.finished}
								mutate={mutateItems}
							/>
						)}
						showsVerticalScrollIndicator={false}
						style={{ marginBottom: 8 }}
						ListHeaderComponent={<Banner />}
						ListFooterComponent={<ListFooter />}
					/>
					<S.Cart>
						<S.CartLeft>
							<S.CartTotal>
								<S.Total>{t('total')}</S.Total>
								<Label>{format(total)}</Label>
							</S.CartTotal>
							{!list.finished && <Progress percentage={percentage} />}
						</S.CartLeft>
						{!list.finished ? (
							<S.FinishButton onPress={onFinish}>
								<ButtonIcon name='checkmark-circle' />
								<ButtonLabel>{t('finish')}</ButtonLabel>
							</S.FinishButton>
						) : (
							<S.FinishedBadge>
								<S.FinishedText>{t('finish_done')}</S.FinishedText>
							</S.FinishedBadge>
						)}
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
			</S.Content>
		</Container>
	)
}

export default ShopView
