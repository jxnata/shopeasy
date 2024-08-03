import React, { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import ShopItem from '../../components/shop-item'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useDocuments } from '../../hooks/documents'
import { databases, queries } from '../../lib/appwrite'
import { Container } from '../../theme/global'
import { List } from '../../types/models/list'

function Shoppings({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'shoppings' })
	const { current } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])

	const {
		data: lists,
		loading,
		mutate,
	} = useDocuments<List[]>({
		queryKey: ['lists-shop', currentId],
		initialData: [],
		enabled: !!currentId,
		queryFn: async () => await databases.listDocuments(DB, MODELS.LIST, queries.listsToShop(currentId)),
	})

	const onOpenShop = async (list: List) => {
		navigation.navigate('shop', { list })
	}

	useLayoutEffect(() => {
		mutate()
	}, [mutate])

	return (
		<Container>
			<S.Content>
				<S.Body>
					<FlatList
						data={lists}
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
