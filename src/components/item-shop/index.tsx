import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native'

import * as S from './styles'
import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import theme from '../../theme'
import { ButtonIcon } from '../../theme/global'
import { Item } from '../../types/models/item'
import { List } from '../../types/models/list'
import { Local } from '../../types/models/local'
import { format } from '../../utils/format'
import CategoryTag from '../category-tag'
import PriceHistory from '../price-history'
import PriceInput from '../price-input'

const ItemShopRow = ({ item, displayCategory, mutate }: Props) => {
	const [checked, setChecked] = useState<boolean>(item.checked)
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'item_shop' })

	const toggle = () => setOpen(old => !old)

	const checkItem = useCallback(async () => {
		if (!item) return
		if (checked) return
		try {
			setChecked(true)
			await databases.updateDocument(DB, MODELS.ITEM, item.$id, { checked: true })
		} catch {
			setChecked(false)
		} finally {
			mutate()
		}
	}, [checked, item, mutate])

	const uncheckItem = useCallback(async () => {
		if (!item) return
		if (!checked) return
		try {
			setChecked(false)
			await databases.updateDocument(DB, MODELS.ITEM, item.$id, { checked: true })
		} catch {
			setChecked(true)
		} finally {
			mutate()
		}
	}, [checked, item, mutate])

	const updateItem = async (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
		if (!item) return
		if (!e.nativeEvent.text) return
		if (isNaN(Number(e.nativeEvent.text))) return
		if (Number(e.nativeEvent.text) <= 0) return

		const body = {
			price: Number(e.nativeEvent.text) * 100,
		}

		try {
			await databases.updateDocument(DB, MODELS.ITEM, item.$id, body)
			mutate()
		} catch {}
	}

	return (
		<S.ItemContainer>
			{displayCategory && <CategoryTag category={item.category} />}
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
					<PriceInput
						type='currency'
						placeholder={t('price')}
						keyboardType='numeric'
						onChangeText={() => {}}
						onEndEditing={updateItem}
						defaultValue={item ? parseFloat(item.price ? item.price.toString() : '0').toFixed(2) : ''}
						options={{
							decimalSeparator: '.',
							groupSeparator: ',',
							precision: 2,
						}}
					/>
				</S.Collapsed>
				<PriceHistory open={open} onClose={toggle} item={item} />
			</S.Container>
		</S.ItemContainer>
	)
}

export default ItemShopRow

type Props = {
	item: Item<List, Local>
	displayCategory?: boolean
	mutate: () => void
}
