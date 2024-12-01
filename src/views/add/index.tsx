import React, { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import units from '../../assets/data/units.json'
import Dropdown from '../../components/dropdown'
import Header from '../../components/header'
import Input from '../../components/input'
import Pressable from '../../components/shared/pressable'
import { toast } from '../../components/toast'
import { addItemToList } from '../../database/models/lists'
import { Container } from '../../theme/global'
import { ListItem } from '../../types/models/list-item'
import { checkIncludes } from '../../utils/check-includes'

function Add({ navigation, route }: Props) {
	const { items, listId } = route.params
	const [tempItems, setTempItems] = useState<string[]>(items)
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
			if (!data.name || !listId) return

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
				addItemToList(listId, newItem)
				setTempItems([...tempItems, data.name])
			} catch {
				setTempItems(tempItems.filter(i => i !== data.name))
			} finally {
				navigation.goBack()
			}
		},
		[listId, navigation, t, tempItems]
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
						<S.ButtonContainer>
							<Pressable
								title={t('confirm_button')}
								left='add-circle'
								onPress={handleSubmit(createItem)}
							/>
						</S.ButtonContainer>
					</S.Col>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Add
