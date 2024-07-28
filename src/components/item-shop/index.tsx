import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import units from '../../assets/data/units.json'
import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import theme from '../../theme'
import { ButtonIcon } from '../../theme/global'
import { Item } from '../../types/models/item'
import { format } from '../../utils/format'
import Dropdown from '../dropdown'
import Icon from '../icon'
import MaskedInput from '../masked-input'

const ItemShopRow = ({ item, onPress, mutate }: Props) => {
	const [data, setData] = useState<Item>(item)
	const [quantity, setQuantity] = useState<number>(data.qty)
	const [deleted, setDeleted] = useState<boolean>(false)
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'item_shop' })
	const { control, handleSubmit } = useForm<Partial<Item>>({
		defaultValues: { price: data.price, unit: data.unit },
	})

	const toggle = () => setOpen(old => !old)

	const updateQuantity = useCallback(
		async (qty: number) => {
			if (qty === data.qty) return

			try {
				const updated: Item = await databases.updateDocument(DB, MODELS.ITEMS, item.$id, { qty })
				mutate()
				setData(updated)
			} catch {
				setQuantity(data.qty)
			}
		},
		[data.qty, item.$id, mutate]
	)

	const deleteItem = useCallback(async () => {
		try {
			setDeleted(true)
			await databases.deleteDocument(DB, MODELS.ITEMS, item.$id)
			mutate()
		} catch {
			setDeleted(false)
		}
	}, [item.$id, mutate])

	const debouncedUpdateQuantity = debounce(qty => updateQuantity(qty), 1000)

	const increase = () => setQuantity(old => old + 1)

	const decrease = async () => {
		if (quantity < 1) return
		if (quantity === 1) deleteItem()
		setQuantity(old => old - 1)
	}

	const updateItem = async (form: Partial<Item>) => {
		if (!form.price && !form.unit) return

		const newPrice = typeof form.price === 'number' ? form.price : Number(form.price) * 100

		const body = {
			price: newPrice,
			unit: form.unit,
		}

		try {
			await databases.updateDocument(DB, MODELS.ITEMS, item.$id, body)
			setData({ ...data, price: body.price, unit: body.unit })
			mutate()
		} catch {
		} finally {
			toggle()
		}
	}

	useEffect(() => {
		debouncedUpdateQuantity(quantity)

		return () => {
			debouncedUpdateQuantity.cancel()
		}
	}, [quantity, debouncedUpdateQuantity])

	if (deleted) return null

	return (
		<S.Container>
			<S.Collapsed>
				<S.CheckButton>
					<ButtonIcon name='ellipse-outline' style={{ fontSize: 28 }} />
				</S.CheckButton>
				{/* <S.CheckButton>
					<ButtonIcon name='checkmark-circle' style={{ fontSize: 28, color: theme.dark.primary }} />
				</S.CheckButton> */}
				<S.RowContainer onPress={toggle} hitSlop={{ top: 10, bottom: 10 }}>
					<S.Text>{item.name}</S.Text>
					<S.SmallContainer>
						{!!data.price && (
							<S.Small>
								{format(data.price / 100)} • {t('needed')} {quantity}
							</S.Small>
						)}
						<S.Small>
							{t('i_need')} {data.qty}{' '}
							{data.unit ? data.unit : quantity > 1 ? t('unit_plural') : t('unit_singular')}
						</S.Small>
					</S.SmallContainer>
				</S.RowContainer>
				<Controller
					control={control}
					rules={{ required: false }}
					name='price'
					render={({ field: { onChange, onBlur, value } }) => (
						<MaskedInput
							label={t('price_label')}
							type='currency'
							placeholder={t('price')}
							keyboardType='numeric'
							onChangeText={onChange}
							onBlur={onBlur}
							options={{
								decimalSeparator: '.',
								groupSeparator: ',',
								precision: 2,
							}}
							defaultValue={data.price ? parseFloat(data.price.toString()).toFixed(2) : ''}
						/>
					)}
				/>
			</S.Collapsed>
		</S.Container>
	)
}

export default ItemShopRow

type Props = {
	item: Item
	onPress?: (item: Item) => void
	mutate: () => void
}
