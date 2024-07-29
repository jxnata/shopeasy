import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import ShopItem from '../../components/shop-item'
import { useSession } from '../../contexts/session'
import { useShops } from '../../hooks/shops'
import { getShoppingsQuery } from '../../lib/appwrite/queries/shoppings-query'
import { Container } from '../../theme/global'
import { List } from '../../types/models/list'
import { Shop } from '../../types/models/shop'

function Shoppings({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'shoppings' })
	const { current } = useSession()

	const queries = getShoppingsQuery(current ? current.$id : undefined)

	const { shops, loading, mutate } = useShops(queries, !current)

	const onOpenShop = async (shop: Shop<List>) => {
		navigation.navigate('shop', { shop, size: 1000 })
	}

	useLayoutEffect(() => {
		mutate()
	}, [mutate])

	return (
		<Container>
			<S.Content>
				<S.Body>
					<FlatList
						data={shops}
						keyExtractor={item => item.$id}
						refreshControl={<RefreshControl onRefresh={mutate} refreshing={loading} />}
						renderItem={({ item }) => <ShopItem item={item} onPress={onOpenShop} />}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
						ListEmptyComponent={
							<S.Empty>
								<S.Text>{t('no_shoppings')}</S.Text>
							</S.Empty>
						}
					/>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Shoppings
