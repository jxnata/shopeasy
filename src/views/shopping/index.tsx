import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, useColorScheme } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Icon from '../../components/icon'
import ListFooter from '../../components/list-footer'
import { Progress } from '../../components/progress'
import ShoppingItemRow from '../../components/shopping-item'
import { useSession } from '../../contexts/session'
import { updateShopping } from '../../database/models/shoppings'
import { useCart } from '../../hooks/cart'
import { useShopping } from '../../hooks/local/useShopping'
import { ButtonIcon, ButtonLabel, Container, Label } from '../../theme/global'
import { format } from '../../utils/format'
import { showInterstitial } from '../../utils/show-interstitial'

function ShoppingView({ navigation, route }: Props) {
	const shoppingParam = route.params ? route.params.shopping : undefined
	const shoppingId = useMemo(() => (shoppingParam ? shoppingParam.id : undefined), [shoppingParam])
	const scheme = useColorScheme()
	const { t } = useTranslation('translation', { keyPrefix: 'shopping' })

	const { premium } = useSession()

	const shopping = useShopping(shoppingId)

	const items = useMemo(() => {
		if (!shopping) return []

		return [...shopping.items].sort((a, b) => {
			if (a.checked !== b.checked) return a.checked ? 1 : -1
			return a.name.localeCompare(b.name)
		})
	}, [shopping])

	const { percentage, total } = useCart(items)

	const itemsList = useMemo(() => items.map(i => i.name), [items])

	const onAdd = useCallback(() => {
		if (!shopping) return

		if (!premium && (itemsList.length === 0 || itemsList.length % 10 === 0)) {
			showInterstitial()
		}

		navigation.navigate('add-shopping', { items: itemsList, shoppingId: shopping.id })
	}, [itemsList, shopping, navigation, premium])

	const onEdit = useCallback(() => {
		if (!shopping) return
		navigation.navigate('edit-shopping', { shopping })
	}, [shopping, navigation])

	const onFinish = () => {
		if (!shopping) return
		updateShopping(shopping.id, { finished: true })
	}

	const HeaderRight = useCallback(() => {
		return (
			<S.Row>
				{shopping && !shopping.finished && (
					<S.GhostButton onPress={onAdd}>
						<Icon name='add-circle' />
					</S.GhostButton>
				)}
				<S.GhostButton onPress={onEdit}>
					<Icon name='ellipsis-vertical' />
				</S.GhostButton>
			</S.Row>
		)
	}, [shopping, onAdd, onEdit])

	return (
		<Container>
			<S.Content>
				{!!shopping && (
					<S.Body>
						<Header title={shopping.local} Right={HeaderRight} backButton />
						<FlatList
							data={items}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<ShoppingItemRow item={item} shoppingId={shoppingId!} finished={shopping.finished} />
							)}
							ListFooterComponent={<ListFooter />}
							showsVerticalScrollIndicator={false}
							style={{ marginBottom: 12 }}
						/>
						<S.Cart>
							<S.Blur blurType={scheme === 'dark' ? 'dark' : 'light'} />
							<S.CartLeft>
								<S.CartTotal>
									<S.Total>{t('total')}</S.Total>
									<Label>{format(total)}</Label>
								</S.CartTotal>
								{!shopping.finished && <Progress percentage={percentage} />}
							</S.CartLeft>
							{!shopping.finished && (
								<S.FinishButton onPress={onFinish}>
									<ButtonIcon name='checkmark-circle' />
									<ButtonLabel>{t('finish')}</ButtonLabel>
								</S.FinishButton>
							)}
							{shopping.finished && <Label>{new Date(shopping.date).toLocaleDateString()}</Label>}
						</S.Cart>
					</S.Body>
				)}
			</S.Content>
		</Container>
	)
}

export default ShoppingView
