import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { deleteShopping, updateShopping } from '../../database/models/shoppings'
import { Button, ButtonLabel, Container, Label } from '../../theme/global'
import { Shopping, ShoppingData } from '../../types/models/shopping'

function ShoppingEdit({ navigation, route }: Props) {
	const shopping = route.params!.shopping
	const { t } = useTranslation('translation', { keyPrefix: 'edit-shopping' })
	const { control, handleSubmit } = useForm<Partial<Shopping>>({
		defaultValues: shopping,
	})

	const onSave = async (form: Partial<ShoppingData>) => {
		if (!form.local) return

		try {
			updateShopping(shopping.id, form)

			navigation.goBack()
		} catch {
			toast.error(t('edit_error'))
		}
	}

	const onDelete = useCallback(() => {
		if (!shopping) return
		try {
			deleteShopping(shopping.id)
			navigation.pop(2)
		} catch {
			toast.error(t('delete_error'))
		}
	}, [shopping, navigation, t])

	const onConfirmDelete = useCallback(() => {
		Alert.alert(t('delete_title'), t('delete_text'), [
			{
				text: t('cancel'),
				style: 'cancel',
			},
			{
				text: t('delete_confirm'),
				onPress: onDelete,
				style: 'default',
			},
		])
	}, [onDelete, t])

	const onCancel = () => {
		navigation.goBack()
	}

	const HeaderRight = useCallback(() => {
		return (
			<S.GhostButton onPress={onConfirmDelete}>
				<S.TrashIcon name='trash-bin-outline' />
			</S.GhostButton>
		)
	}, [onConfirmDelete])

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header backButton title={t('title')} Right={HeaderRight} />
					<Controller
						control={control}
						rules={{ required: true }}
						name='local'
						render={({ field: { onChange, value } }) => (
							<Input
								label={t('shopping_local')}
								value={value}
								onChangeText={onChange}
								placeholder={t('shopping_local_placeholder')}
								maxLength={32}
							/>
						)}
					/>
					<S.Separator />
					<Button onPress={handleSubmit(onSave)}>
						<ButtonLabel>{t('edit_button')}</ButtonLabel>
					</Button>
					<S.CancelButton onPress={onCancel}>
						<Label>{t('cancel_button')}</Label>
					</S.CancelButton>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default ShoppingEdit
