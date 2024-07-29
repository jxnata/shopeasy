import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as S from './styles'
import { useExpenses } from '../../hooks/expenses'
import { getExpenseByItemQuery } from '../../lib/appwrite/queries/expense-item'
import { Item } from '../../types/models/item'
import { format } from '../../utils/format'

type Props = {
	open: boolean
	item: Item
	onClose: () => void
}

const PriceHistory = ({ open, item, onClose }: Props) => {
	const { bottom } = useSafeAreaInsets()
	const { t } = useTranslation('translation', { keyPrefix: 'price_history' })
	const queries = getExpenseByItemQuery(item.$id)
	const { expenses } = useExpenses(queries, !open)

	return (
		<Modal animationType='fade' transparent visible={open} onRequestClose={onClose}>
			<S.Container onPress={onClose}>
				<S.Content style={{ paddingBottom: bottom }}>
					<S.Title>
						{item.name} - {t('title')}
					</S.Title>
					<FlatList
						data={expenses}
						keyExtractor={item => item.$id}
						renderItem={({ item }) => (
							<S.Row>
								<S.RowText>{item.shop.name}</S.RowText>
								<S.RowText>{new Date(item.$createdAt).toLocaleDateString()}</S.RowText>
								<S.RowText>{format(item.price / 100)}</S.RowText>
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
