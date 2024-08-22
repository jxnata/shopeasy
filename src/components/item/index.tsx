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
import { removeItemFromList, updateItemInList } from '../../database/models/lists'
import { ListItem } from '../../types/models/list-item'
import { format } from '../../utils/format'
import Icon from '../icon'
import PriceInput from '../price-input'
import SmallDropdown from '../small-dropdown'

const ItemRow = ({ item, listId }: Props) => {
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'item' })
	const { control, register } = useForm<Partial<ListItem>>({
		defaultValues: { price: item.price, unit: item.unit, qty: item.qty },
	})

	const animationValue = useSharedValue(0)

	const toggle = () => {
		if (open) {
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
		removeItemFromList(listId, item.id)
	}, [item.id, listId])

	const updatePrice = useCallback(
		(price: string) => {
			if (!price) return
			if (isNaN(Number(price))) return

			const newPrice = typeof price === 'number' ? price : Number(price) * 100

			updateItemInList(listId, item.id, { price: newPrice })
		},
		[item.id, listId]
	)

	const updateUnit = useCallback(
		(unit: string) => {
			if (!unit) return

			updateItemInList(listId, item.id, { unit })
		},
		[item.id, listId]
	)

	const updateQuantity = useCallback(
		(qty: number) => {
			if (qty < 1) return

			updateItemInList(listId, item.id, { qty })
		},
		[item.id, listId]
	)

	const updateChecked = useCallback(
		(checked: boolean) => {
			if (checked) ReactNativeHapticFeedback.trigger('impactMedium')
			updateItemInList(listId, item.id, { checked })
		},
		[item.id, listId]
	)

	register('price', { onChange: e => updatePrice(e.target.value) })
	register('unit', { onChange: e => updateUnit(e.target.value) })
	register('qty', { onChange: e => updateQuantity(e.target.value) })
	register('checked', { onChange: e => updateChecked(e.target.value) })

	return (
		<S.Container>
			<S.Collapsed aria-checked={item.checked}>
				<Controller
					control={control}
					rules={{ required: false }}
					name='checked'
					render={({ field: { onChange, value } }) => (
						<S.CheckButton onPress={() => onChange(!value)}>
							<S.CheckIcon
								name={value ? 'checkmark-circle' : 'ellipse-outline'}
								style={{ fontSize: 24 }}
							/>
						</S.CheckButton>
					)}
				/>
				<S.RowContainer onPress={toggle} hitSlop={{ top: 10, bottom: 10 }} activeOpacity={0.7}>
					<S.Col>
						<S.Text aria-checked={item.checked}>{item.name}</S.Text>
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
								render={({ field: { onChange, onBlur } }) => (
									<PriceInput
										label={t('qty_label')}
										mask='9999'
										keyboardType='number-pad'
										onChangeText={onChange}
										onBlur={onBlur}
										defaultValue={item.qty ? item.qty.toString() : ''}
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
									/>
								)}
							/>
							<S.QuantityButton onPress={deleteItem}>
								<Icon name='trash-outline' />
							</S.QuantityButton>
						</S.Row>
					</S.CollapsedContent>
				</Animated.View>
			)}
		</S.Container>
	)
}

export default ItemRow

type Props = {
	item: ListItem
	listId: string
}
