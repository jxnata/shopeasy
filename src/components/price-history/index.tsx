import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as S from './styles'
import { DB, MODELS } from '../../constants'
import { useDocuments } from '../../hooks/documents'
import { databases, queries } from '../../lib/appwrite'
import { Item } from '../../types/models/item'
import { List } from '../../types/models/list'
import { Local } from '../../types/models/local'
import { format } from '../../utils/format'

type Props = {
	open: boolean
	item: Item<List, Local>
	onClose: () => void
}

const PriceHistory = ({ open, item, onClose }: Props) => {
	const { bottom } = useSafeAreaInsets()
	const { t } = useTranslation('translation', { keyPrefix: 'price_history' })

	const { data: items } = useDocuments<Item<undefined, Local>[]>({
		queryKey: ['items-history', item.local.$id],
		initialData: [],
		enabled: !!item.local.$id,
		queryFn: async () => await databases.listDocuments(DB, MODELS.ITEM, queries.itemsByLocal(item.local.$id)),
	})

	return (
		<Modal animationType='fade' transparent visible={open} onRequestClose={onClose}>
			<S.Container onPress={onClose}>
				<S.Content style={{ paddingBottom: bottom }}>
					<S.Title>
						{t('title')}: {item.name}
					</S.Title>
					<FlatList
						data={items}
						keyExtractor={item => item.$id}
						renderItem={({ item }) => (
							<S.Row>
								<S.RowText>{item.local.name}</S.RowText>
								<S.RowText>{new Date(item.$createdAt).toLocaleDateString()}</S.RowText>
								<S.RowText>{format(item.price ? item.price / 100 : 0)}</S.RowText>
							</S.Row>
						)}
						ListHeaderComponent={
							<S.ListHeader>
								<S.Text>{t('local')}</S.Text>
								<S.Text>{t('date')}</S.Text>
								<S.Text>{t('price')}</S.Text>
							</S.ListHeader>
						}
						ListEmptyComponent={<S.EmptyText>{t('no_expenses')}</S.EmptyText>}
						showsVerticalScrollIndicator={false}
						style={{ marginBottom: 36 }}
					/>
				</S.Content>
			</S.Container>
		</Modal>
	)
}

export default PriceHistory
