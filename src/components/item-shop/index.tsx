import { ID } from 'appwrite'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native'

import * as S from './styles'
import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import theme from '../../theme'
import { ButtonIcon } from '../../theme/global'
import { Expense } from '../../types/models/expense'
import { Item } from '../../types/models/item'
import { format } from '../../utils/format'
import PriceHistory from '../price-history'
import PriceInput from '../price-input'

const ItemShopRow = ({ item, expense, shopId, onPress, mutate }: Props) => {
	const [checked, setChecked] = useState<boolean>(expense !== null)
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'item_shop' })

	const toggle = () => setOpen(old => !old)

	const checkItem = async () => {
		try {
			setChecked(true)

			const body = { price: item.price, item: item.$id, shop: shopId }

			await databases.createDocument(DB, MODELS.EXPENSES, ID.unique(), body)
		} catch {
			setChecked(false)
		} finally {
			mutate()
		}
	}

	const uncheckItem = async () => {
		if (!expense) return
		try {
			setChecked(false)
			await databases.deleteDocument(DB, MODELS.EXPENSES, expense.$id)
		} catch {
			setChecked(true)
		} finally {
			mutate()
		}
	}

	const updateItem = async (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
		if (!expense) return
		if (!e.nativeEvent.text) return
		if (isNaN(Number(e.nativeEvent.text))) return
		if (Number(e.nativeEvent.text) <= 0) return

		const body = {
			price: Number(e.nativeEvent.text) * 100,
		}

		try {
			await databases.updateDocument(DB, MODELS.EXPENSES, expense.$id, body)
			mutate()
		} catch {}
	}

	return (
		<S.Container>
			{checked ? (
				<S.CheckButton onPress={uncheckItem}>
					<ButtonIcon name='checkmark-circle' style={{ fontSize: 28, color: theme.dark.primary }} />
				</S.CheckButton>
			) : (
				<S.CheckButton onPress={checkItem}>
					<ButtonIcon name='ellipse-outline' style={{ fontSize: 28 }} />
				</S.CheckButton>
			)}
			<S.Collapsed>
				<S.RowContainer onPress={toggle} hitSlop={{ top: 10, bottom: 10 }}>
					<S.Text aria-checked={checked}>{item.name}</S.Text>
					<S.SmallContainer>
						{!!item.price && (
							<S.Small aria-checked={checked}>
								{format(item.price / 100)} • {t('i_need')} {item.qty}{' '}
								{item.unit ? item.unit : item.qty > 1 ? t('unit_plural') : t('unit_singular')}
							</S.Small>
						)}
						{!item.price && (
							<S.Small aria-checked={checked}>
								{t('i_need')} {item.qty}{' '}
								{item.unit ? item.unit : item.qty > 1 ? t('unit_plural') : t('unit_singular')}
							</S.Small>
						)}
					</S.SmallContainer>
				</S.RowContainer>
				{!!expense && (
					<PriceInput
						type='currency'
						placeholder={t('price')}
						keyboardType='numeric'
						onChangeText={() => {}}
						onEndEditing={updateItem}
						defaultValue={
							expense ? parseFloat(expense.price ? expense.price.toString() : '0').toFixed(2) : ''
						}
						options={{
							decimalSeparator: '.',
							groupSeparator: ',',
							precision: 2,
						}}
					/>
				)}
			</S.Collapsed>
			<PriceHistory open={open} onClose={toggle} item={item} />
		</S.Container>
	)
}

export default ItemShopRow

type Props = {
	item: Item
	shopId: string
	expense: Expense<Item> | null
	onPress?: (item: Item) => void
	mutate: () => void
}
