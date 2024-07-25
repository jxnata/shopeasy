import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import units from '../../assets/data/units.json'
import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { Item } from '../../types/models/item'
import { format } from '../../utils/format'
import Dropdown from '../dropdown'
import Icon from '../icon'
import MaskedInput from '../masked-input'

const ItemRow = ({ item, onPress, mutate }: Props) => {
	const [data, setData] = useState<Item>(item)
	const [quantity, setQuantity] = useState<number>(data.qty)
	const [deleted, setDeleted] = useState<boolean>(false)
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'item' })
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
				<S.RowContainer onPress={toggle} hitSlop={{ top: 10, bottom: 10 }}>
					<S.Text>{item.name}</S.Text>
				</S.RowContainer>
				<S.QuantityContainer>
					<S.QuantityButton onPress={decrease}>
						<Icon name={quantity <= 1 ? 'trash-outline' : 'remove'} />
					</S.QuantityButton>
					<S.Text>{quantity}</S.Text>
					<S.QuantityButton onPress={increase}>
						<Icon name='add' />
					</S.QuantityButton>
				</S.QuantityContainer>
			</S.Collapsed>
			{!!data.price && (
				<S.SmallContainer>
					<S.Small>
						{format(data.price / 100)} • {t('needed')} {quantity}
					</S.Small>
					<S.Small>{data.unit ? data.unit : quantity > 1 ? t('unit_plural') : t('unit_singular')}</S.Small>
				</S.SmallContainer>
			)}
			{open && (
				<S.CollapsedContent>
					<Controller
						control={control}
						rules={{ required: false }}
						name='price'
						render={({ field: { onChange, onBlur, value } }) => (
							<MaskedInput
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
					<Controller
						control={control}
						rules={{ required: false }}
						name='unit'
						render={({ field: { onChange, onBlur, value } }) => (
							<Dropdown
								placeholder={t('unit')}
								options={units}
								onValueChange={onChange}
								selectedValue={value || ''}
							/>
						)}
					/>
					<S.SaveButton onPress={handleSubmit(updateItem)}>
						<Icon name='checkmark' style={{ fontSize: 20 }} />
					</S.SaveButton>
				</S.CollapsedContent>
			)}
		</S.Container>
	)
}

export default ItemRow

type Props = {
	item: Item
	onPress?: (item: Item) => void
	mutate: () => void
}
