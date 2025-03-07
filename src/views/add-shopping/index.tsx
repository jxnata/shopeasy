import React, { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Switch, TextInput } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import units from '../../assets/data/units.json'
import Dropdown from '../../components/dropdown'
import Header from '../../components/header'
import Input from '../../components/input'
import Pressable from '../../components/shared/pressable'
import { toast } from '../../components/toast'
import { addItemToList as addItemToMainList, getShoppingList } from '../../database/models/lists'
import { addItemToList, getShopping } from '../../database/models/shoppings'
import { Container } from '../../theme/global'
import { ListItem } from '../../types/models/list-item'
import { checkIncludes } from '../../utils/check-includes'

function AddShopping({ navigation, route }: Props) {
	const { items, shoppingId } = route.params
	const [tempItems, setTempItems] = useState<string[]>(items)
	const [addToMainList, setAddToMainList] = useState(true)
	const { t } = useTranslation('translation', { keyPrefix: 'add' })
	const { control, handleSubmit } = useForm<Partial<ListItem>>({
		defaultValues: { qty: 1 },
	})

	const nameRef = useRef<TextInput>(null)
	const haveRef = useRef<TextInput>(null)

	const nextFocus = () => {
		if (!haveRef.current) return
		haveRef.current.focus()
	}

	const createItem = useCallback(
		(data: Partial<ListItem>) => {
			if (!data.name || !shoppingId) return

			if (checkIncludes(tempItems, data.name)) {
				toast.error(t('item_exists'))
				return
			}

			try {
				const newItem = {
					name: data.name.trim(),
					have: data.have || 0,
					qty: 1,
					unit: data.unit || null,
					price: null,
					checked: false,
				}
				addItemToList(shoppingId, newItem)
				setTempItems([...tempItems, data.name])

				if (addToMainList) {
					const shopping = getShopping(shoppingId)
					if (!shopping) return

					const list = getShoppingList(shopping.list_id)
					if (!list) return

					addItemToMainList(list.id, newItem)
				}
			} catch {
				setTempItems(tempItems.filter(i => i !== data.name))
			} finally {
				navigation.goBack()
			}
		},
		[addToMainList, shoppingId, tempItems, t, navigation]
	)

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header backButton title={t('title')} />
					<Controller
						control={control}
						rules={{ required: false }}
						name='name'
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								label={t('item_name')}
								ref={nameRef}
								clearButtonMode='while-editing'
								placeholder={t('search_placeholder')}
								maxLength={32}
								autoFocus
								onChangeText={onChange}
								value={value ? value.toString() : ''}
								onBlur={onBlur}
								onEndEditing={nextFocus}
							/>
						)}
					/>
					<S.Col>
						<Controller
							control={control}
							rules={{ required: false }}
							name='have'
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									label={t('item_have')}
									placeholder='0'
									ref={haveRef}
									keyboardType='number-pad'
									maxLength={5}
									onChangeText={onChange}
									value={value ? value.toString() : ''}
									onBlur={onBlur}
								/>
							)}
						/>
						<Controller
							control={control}
							rules={{ required: false }}
							name='unit'
							render={({ field: { onChange, value } }) => (
								<Dropdown
									label={t('unit')}
									placeholder={t('unit')}
									options={units}
									onValueChange={onChange}
									selectedValue={value || ''}
								/>
							)}
						/>
					</S.Col>
					<S.Row>
						<Switch onValueChange={checked => setAddToMainList(checked)} value={addToMainList} />
						<S.Label>{t('add_to_main_list')}</S.Label>
					</S.Row>
					<S.ButtonContainer>
						<Pressable title={t('confirm_button')} left='add-circle' onPress={handleSubmit(createItem)} />
					</S.ButtonContainer>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default AddShopping
