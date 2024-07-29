import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import Input from '../../components/input'
import ItemShopRow from '../../components/item-shop'
import Options from '../../components/options'
import { toast } from '../../components/toast'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useExpenses } from '../../hooks/expenses'
import { useItems } from '../../hooks/items'
import { useShops } from '../../hooks/shops'
import { useViewShop } from '../../hooks/shops/view'
import { databases } from '../../lib/appwrite'
import { getShopExpenseQuery } from '../../lib/appwrite/queries/shop-expense-query'
import { getShopQuery } from '../../lib/appwrite/queries/shop-query'
import { getShoppingsQuery } from '../../lib/appwrite/queries/shoppings-query'
import { Container, Label } from '../../theme/global'

function ShopView({ navigation, route }: Props) {
	const shopParam = route.params ? route.params.shop : undefined
	const size = route.params ? route.params.size : 0

	const { current } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'shop' })

	const { shop, mutate: mutateShop } = useViewShop(shopParam ? shopParam.$id : undefined, shopParam)
	const [name, setName] = useState<string>(shopParam ? shopParam.name || '' : '')
	const [displayTip, setDisplayTip] = useState(true)
	const [editName, setEditName] = useState(false)
	const [optionsOpen, setOptionsOpen] = useState(false)

	const expensesQueries = getShopExpenseQuery(shop ? shop.$id : undefined, size)
	const { expenses, mutate: mutateExpenses } = useExpenses(expensesQueries, !shop)

	const shoppingsQueries = getShoppingsQuery(current ? current.$id : undefined)

	const { mutate: mutateShoppings } = useShops(shoppingsQueries, !current)

	const queries = getShopQuery(shop ? shop.list.$id : undefined, size)
	const disabled = !shop || !current
	const { items } = useItems(queries, disabled)

	const toggle = useCallback(() => setOptionsOpen(old => !old), [])
	const closeTip = () => setDisplayTip(false)

	const onRename = () => {
		setOptionsOpen(false)
		setEditName(old => !old)
	}

	const onDelete = async () => {
		if (!shop) return
		try {
			await databases.deleteDocument(DB, MODELS.SHOP, shop.$id)
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
		if (!current || !name || !shop) return

		try {
			await databases.updateDocument(DB, MODELS.SHOP, shop.$id, { name })
			mutateShop()
			mutateShoppings()
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

	const getExpense = useCallback(
		(id: string) => {
			const expense = expenses.find(expense => expense.item.$id === id)

			if (!expense) return null

			return expense
		},
		[expenses]
	)

	useEffect(() => {
		if (!shop) return

		navigation.setOptions({ title: shop.name || t('title'), headerRight: HeaderRight })
	}, [HeaderRight, navigation, shop, t])

	return (
		<Container>
			<S.Content>
				{(shopParam && !shopParam.name) ||
					(editName && (
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
					))}
				{!!shop && (
					<S.Body>
						<FlatList
							data={items}
							keyExtractor={item => item.$id}
							renderItem={({ item }) => (
								<ItemShopRow
									shopId={shop.$id}
									expense={getExpense(item.$id)}
									item={item}
									mutate={mutateExpenses}
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
