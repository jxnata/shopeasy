import { upperFirst } from 'lodash'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolate,
	Extrapolation,
} from 'react-native-reanimated'

import * as S from './styles'
import units from '../../assets/data/units.json'
import { removeItemFromList, updateItemInList } from '../../database/models/shoppings'
import { ListItem } from '../../types/models/list-item'
import { format } from '../../utils/format'
import Icon from '../icon'
import PriceInput from '../price-input'
import SmallDropdown from '../small-dropdown'

const ShoppingItemRow = ({ item, shoppingId, finished }: Props) => {
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'item' })
	const { control, handleSubmit } = useForm<Partial<ListItem>>({
		defaultValues: { price: item.price, unit: item.unit, qty: item.qty, checked: item.checked },
	})

	const animationValue = useSharedValue(0)

	const toggle = () => {
		if (open) {
			handleSubmit(saveChanges)()
			setTimeout(() => setOpen(false), 200)
		} else {
			setOpen(old => !old)
		}
		animationValue.value = withTiming(open ? 0 : 1, { duration: 200 })
	}

	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: interpolate(animationValue.value, [0, 1], [0, 64], Extrapolation.CLAMP),
			opacity: interpolate(animationValue.value, [0, 1], [0, 1], Extrapolation.CLAMP),
		}
	})

	const deleteItem = useCallback(() => {
		removeItemFromList(shoppingId, item.id)
	}, [item.id, shoppingId])

	const saveChanges = (data: Partial<ListItem>) => {
		const updates: Partial<ListItem> = {}

		if (data.price !== undefined && data.price !== item.price) {
			const newPrice = data.price !== null ? data.price * 100 : null

			if (newPrice === null || !isNaN(Number(newPrice))) {
				updates.price = newPrice
			}
		}

		if (data.unit !== undefined && data.unit !== item.unit) {
			updates.unit = data.unit
		}

		if (data.qty !== undefined && data.qty !== item.qty) {
			const qty = Number(data.qty)
			if (!isNaN(qty) && qty >= 1) {
				updates.qty = qty
			}
		}

		if (data.checked !== undefined && data.checked !== item.checked) {
			if (data.checked) ReactNativeHapticFeedback.trigger('impactMedium')
			updates.checked = data.checked
		}

		if (Object.keys(updates).length > 0) {
			updateItemInList(shoppingId, item.id, updates)
		}
	}

	return (
		<S.Container>
			<S.Collapsed aria-checked={item.checked}>
				<Controller
					control={control}
					rules={{ required: false }}
					name='checked'
					render={({ field: { onChange, value } }) => (
						<S.CheckButton
							onPress={() => {
								const newValue = !value
								onChange(newValue)
								saveChanges({ checked: newValue })
								if (open) toggle()
							}}
							disabled={finished}
						>
							<S.CheckIcon
								name={value ? 'checkmark-circle' : 'ellipse-outline'}
								style={{ fontSize: 24 }}
							/>
						</S.CheckButton>
					)}
				/>
				<S.RowContainer onPress={toggle} hitSlop={{ top: 10, bottom: 10 }} activeOpacity={0.7}>
					<S.Col>
						<S.Text aria-checked={item.checked}>{upperFirst(item.name)}</S.Text>
						<S.Small aria-checked={item.checked}>
							{item.have > 0 ? t('have') : t('havent')} {item.have > 0 ? item.have : ''}{' '}
							{item.unit ? (item.have > 0 ? item.unit : '') : ''}
						</S.Small>
					</S.Col>
					<S.ColRight>
						<S.SmallContainer>
							<S.Small>
								{item.price ? format(item.price / 100) : ''} ⅹ {item.qty}
							</S.Small>
							<S.Small>{item.unit}</S.Small>
						</S.SmallContainer>
						<Icon name={open ? 'chevron-up' : 'chevron-down'} />
					</S.ColRight>
				</S.RowContainer>
			</S.Collapsed>
			{open && (
				<Animated.View style={animatedStyle}>
					<S.CollapsedContent>
						<S.Row>
							<Controller
								control={control}
								rules={{ required: false }}
								name='qty'
								render={({ field: { onChange, onBlur, value } }) => (
									<PriceInput
										label={t('qty_label')}
										mask='9999'
										keyboardType='number-pad'
										onChangeText={onChange}
										onBlur={onBlur}
										value={value ? value.toString() : ''}
										readOnly={finished}
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
										disabled={finished}
									/>
								)}
							/>
							<Controller
								control={control}
								rules={{ required: false }}
								name='price'
								render={({ field: { onChange, onBlur } }) => (
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
										defaultValue={item.price ? parseFloat(item.price.toString()).toFixed(2) : ''}
										readOnly={finished}
									/>
								)}
							/>
							<S.QuantityButton onPress={deleteItem} disabled={finished}>
								<Icon name='trash-outline' />
							</S.QuantityButton>
							<S.SaveButton onPress={toggle}>
								<S.QuantityButtonText>{t('save')}</S.QuantityButtonText>
								<Icon name='checkmark-outline' />
							</S.SaveButton>
						</S.Row>
					</S.CollapsedContent>
				</Animated.View>
			)}
		</S.Container>
	)
}

export default ShoppingItemRow

type Props = {
	item: ListItem
	finished: boolean
	shoppingId: string
}
