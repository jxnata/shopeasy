import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Skeleton from './skeleton'
import * as S from './styles'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useDocuments } from '../../hooks/documents'
import { databases, queries } from '../../lib/appwrite'
import { Item } from '../../types/models/item'
import { List } from '../../types/models/list'
import { Local } from '../../types/models/local'
import { StackParamList } from '../../types/navigation/stack'
import { format } from '../../utils/format'
import { getCurrency } from '../../utils/get-currency'
import { sortByDistance } from '../../utils/sort-by-distance'

type Props = {
	open: boolean
	item: Item<List, Local>
	onClose: () => void
}

const currency = getCurrency()

const PriceHistory = ({ open, item, onClose }: Props) => {
	const { bottom } = useSafeAreaInsets()
	const { premium } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'price_history' })
	const [location, setLocation] = useState({ latitude: 0, longitude: 0 })
	const navigation = useNavigation<ScreenNavigationProp>()

	const { data: items, loading } = useDocuments<Item<List, Local>[]>({
		queryKey: ['items-history', item.local.$id],
		initialData: [],
		enabled: !!item.local.$id && open && premium && location.latitude !== 0 && location.longitude !== 0,
		queryFn: async () =>
			await databases.listDocuments(
				DB,
				MODELS.ITEM,
				queries.itemsByNameAndLocal(item.$id, item.name, currency, location.latitude, location.longitude)
			),
	})

	const goPremium = () => {
		navigation.navigate('subscribe')
		onClose()
	}

	const sortedItems = useMemo(() => sortByDistance(items, location.latitude, location.longitude), [items, location])

	useEffect(() => {
		Geolocation.getCurrentPosition((info: GeolocationResponse) => setLocation(info.coords))
	}, [])

	return (
		<Modal animationType='fade' transparent visible={open} onRequestClose={onClose}>
			<S.Container>
				<S.Content style={{ paddingBottom: bottom }}>
					<S.CloseButton onPress={onClose}>
						<S.X>✕</S.X>
					</S.CloseButton>
					<S.Title>
						{t('title')}: {item.name}
					</S.Title>
					{loading && !sortedItems.length && <Skeleton />}
					{!premium ? (
						<S.PremiumContainer onPress={goPremium}>
							<S.Premium>{t('premium')}</S.Premium>
						</S.PremiumContainer>
					) : (
						<FlatList
							data={sortedItems}
							keyExtractor={item => item.$id}
							refreshing={loading}
							renderItem={({ item }) => (
								<S.Row>
									<S.LocalCol>
										<S.RowTitle>{item.name}</S.RowTitle>
										<S.RowText>{item.local.name}</S.RowText>
										<S.RowSmall>{new Date(item.$createdAt).toLocaleDateString()}</S.RowSmall>
									</S.LocalCol>
									<S.RowValue aria-valuenow={item.price || 0}>
										{format(item.price ? item.price / 100 : 0)}
									</S.RowValue>
								</S.Row>
							)}
							ListEmptyComponent={<S.EmptyText>{t('no_expenses')}</S.EmptyText>}
							showsVerticalScrollIndicator={false}
							style={{ marginBottom: 36 }}
						/>
					)}
				</S.Content>
			</S.Container>
		</Modal>
	)
}

export default PriceHistory

type ScreenNavigationProp = NativeStackNavigationProp<StackParamList>
