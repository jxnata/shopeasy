import { debounce } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import units from '../../assets/data/units.json'
import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { ButtonIcon } from '../../theme/global'
import { Categories } from '../../types/models/categories'
import { Item } from '../../types/models/item'
import { List } from '../../types/models/list'
import { Local } from '../../types/models/local'
import { categoryNumber } from '../../utils/category-number'
import { format } from '../../utils/format'
import CategoryTag from '../category-tag'
import Icon from '../icon'
import PriceInput from '../price-input'
import SmallDropdown from '../small-dropdown'

const ItemRow = ({ item, displayCategory, mutate }: Props) => {
	const [data, setData] = useState<Item<string, undefined>>(item)
	const [quantity, setQuantity] = useState<number>(data.qty)
	const [deleted, setDeleted] = useState<boolean>(false)
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'item' })
	const { control, handleSubmit } = useForm<Partial<Item<List, undefined>>>({
		defaultValues: { price: data.price, unit: data.unit, category: data.category },
	})

	const categories = useMemo(
		() =>
			Object.values(Categories).map(c => {
				return {
					label: t(c, { keyPrefix: 'categories' }),
					value: categoryNumber(c),
				}
			}),
		[t]
	)

	const toggle = () => setOpen(old => !old)

	const updateQuantity = useCallback(
		async (qty: number) => {
			if (qty === data.qty) return
			if (qty < 1) return

			try {
				const updated: Item<string, undefined> = await databases.updateDocument(DB, MODELS.ITEM, item.$id, {
					qty,
				})
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
			await databases.deleteDocument(DB, MODELS.ITEM, item.$id)
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

	const updateItem = async (form: Partial<Item<List, Local>>) => {
		if (!form.price && !form.unit && !form.category) return

		const newPrice = typeof form.price === 'number' ? form.price : Number(form.price) * 100

		const body = {
			price: newPrice,
			unit: form.unit || null,
			category: form.category || data.category,
		}

		try {
			await databases.updateDocument(DB, MODELS.ITEM, item.$id, body)
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
		<S.ItemContainer>
			{displayCategory && <CategoryTag category={item.category} />}
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
						<S.Small>
							{data.unit ? data.unit : quantity > 1 ? t('unit_plural') : t('unit_singular')}
						</S.Small>
					</S.SmallContainer>
				)}
				{open && (
					<S.CollapsedContent>
						<S.Col>
							<S.Row>
								<Controller
									control={control}
									rules={{ required: false }}
									name='price'
									render={({ field: { onChange, onBlur, value } }) => (
										<PriceInput
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
											defaultValue={
												data.price ? parseFloat(data.price.toString()).toFixed(2) : ''
											}
										/>
									)}
								/>
								<Controller
									control={control}
									rules={{ required: false }}
									name='unit'
									render={({ field: { onChange, value } }) => (
										<SmallDropdown
											label={t('unit_label')}
											placeholder={t('unit')}
											options={units}
											onValueChange={onChange}
											selectedValue={value || ''}
										/>
									)}
								/>
							</S.Row>
							<Controller
								control={control}
								rules={{ required: false }}
								name='category'
								render={({ field: { onChange, value } }) => (
									<SmallDropdown
										label={t('category_label')}
										placeholder={t('category')}
										options={categories}
										onValueChange={onChange}
										selectedValue={value || ''}
									/>
								)}
							/>
						</S.Col>
						<S.SaveButton onPress={handleSubmit(updateItem)}>
							<ButtonIcon name='checkmark' style={{ fontSize: 20 }} />
						</S.SaveButton>
					</S.CollapsedContent>
				)}
			</S.Container>
		</S.ItemContainer>
	)
}

export default ItemRow

type Props = {
	item: Item<string, undefined>
	displayCategory?: boolean
	mutate: () => void
}
