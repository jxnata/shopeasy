import { ID } from 'appwrite'
import React, { useEffect, useState } from 'react'
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
import { useViewShop } from '../../hooks/shops/view'
import { databases } from '../../lib/appwrite'
import { getShopExpenseQuery } from '../../lib/appwrite/queries/shop-expense-query'
import { getShopQuery } from '../../lib/appwrite/queries/shop-query'
import { Container, Label } from '../../theme/global'
import { List } from '../../types/models/list'
import { Shop } from '../../types/models/shop'
import { getPermissions } from '../../utils/getPermissions'

function ShopView({ navigation, route }: Props) {
	const shopParam = route.params ? route.params.shop : undefined
	const size = route.params ? route.params.size : 0

	const { current } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'shop' })
	const [shopId, setShopId] = useState<string | undefined>(shopParam ? shopParam.$id : undefined)
	const { shop } = useViewShop(shopId, shopParam)
	const [name, setName] = useState<string>(shopParam ? shopParam.name || t('new_shop') : '')
	const [optionsOpen, setOptionsOpen] = useState(false)

	const expensesQueries = getShopExpenseQuery(shop ? shop.$id : undefined, size)
	const { expenses, mutate: mutateExpenses } = useExpenses(expensesQueries, !shop)

	const queries = getShopQuery(shop ? shop.list.$id : undefined, size)
	const disabled = !shop || !current
	const { items, mutate } = useItems(queries, disabled)

	const toggle = () => setOptionsOpen(old => !old)

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

	const onSave = async () => {
		if (!current || !name) return

		try {
			const created: Shop<List> = await databases.createDocument(
				DB,
				MODELS.SHOP,
				ID.unique(),
				{ name, user: current.$id },
				getPermissions(current.$id)
			)
			mutateExpenses()
			setShopId(created.$id)
		} catch {
			toast.error(t('create_error'))
		}
	}
	console.tron.log(shopParam, size)
	useEffect(() => {
		if (!shopParam && size > 0) {
			console.tron.log('entrou ----> shopParam && size > 0')
		}
	}, [shopParam, size])

	return (
		<Container>
			<S.Content>
				<S.Header>
					<S.Title>{shop ? shop.name : t('title')}</S.Title>
					{!!shop && (
						<S.GhostButton onPress={toggle}>
							<Icon name='ellipsis-vertical' />
						</S.GhostButton>
					)}
				</S.Header>
				<S.Body>
					{!shop && (
						<Input
							value={name}
							onChangeText={setName}
							placeholder={t('shop_name')}
							maxLength={32}
							autoFocus={items.length === 0}
							onSubmitEditing={onSave}
							returnKeyType='done'
						/>
					)}
					<FlatList
						data={items}
						keyExtractor={item => item.$id}
						renderItem={({ item }) => <ItemShopRow item={item} mutate={mutate} />}
						showsVerticalScrollIndicator={false}
						style={{ marginBottom: 12 }}
					/>
					<Options open={optionsOpen} onClose={toggle}>
						{/* <S.OptionButton onPress={onRename}>
							<Icon name='create' />
							<Label>{t('edit_option')}</Label>
						</S.OptionButton> */}
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
