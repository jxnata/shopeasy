import RNDateTimePicker from '@react-native-community/datetimepicker'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { ID } from 'appwrite'
import React, { useCallback, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, Switch } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { deleteShoppingList, updateShoppingList } from '../../database/models/lists'
import { Button, ButtonLabel, Container, Label } from '../../theme/global'
import { ShoppingList, ShoppingListData } from '../../types/models/shopping-list'

function ListEdit({ navigation, route }: Props) {
	const list = route.params!.list
	const { t } = useTranslation('translation', { keyPrefix: 'edit' })

	const { current, premium } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])
	const { control, handleSubmit, watch, setValue } = useForm<Partial<ShoppingList>>({
		defaultValues: list,
	})

	const notificationEnabled = !!watch('notification_id')

	const onSave = async (form: Partial<ShoppingListData>) => {
		if (!currentId || !form.name) return

		try {
			if (form.notification_id && form.notification_time) {
				PushNotificationIOS.removePendingNotificationRequests([form.notification_id])

				PushNotificationIOS.addNotificationRequest({
					title: t('notification_title'),
					body: t('notification_body'),
					repeats: false,
					fireDate: new Date(form.notification_time),
					id: form.notification_id,
				})
			}

			updateShoppingList(list.id, form)

			navigation.goBack()
		} catch {
			toast.error(t('edit_error'))
		}
	}

	const onDelete = useCallback(() => {
		if (!list) return
		try {
			deleteShoppingList(list.id)
			navigation.pop(2)
		} catch {
			toast.error(t('delete_error'))
		}
	}, [list, navigation, t])

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

	const toggleNotification = (value: boolean, onChange: (value: boolean) => void) => {
		onChange(value)
		setValue('notification_id', value ? ID.unique() : undefined)
	}

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
					<Header title={t('title')} Right={HeaderRight} />
					<Controller
						control={control}
						rules={{ required: true }}
						name='name'
						render={({ field: { onChange, value } }) => (
							<Input
								label={t('list_name')}
								value={value}
								onChangeText={onChange}
								placeholder={t('list_name')}
								maxLength={32}
							/>
						)}
					/>
					{!premium && (
						<S.NoticeBox>
							<S.Notice>{t('premium_notice')}</S.Notice>
						</S.NoticeBox>
					)}
					{premium && !list.finished && (
						<S.Row>
							<S.Col>
								<S.InuptLabel>{t('notification')}</S.InuptLabel>
								<Controller
									control={control}
									rules={{ required: false }}
									name='notification_id'
									render={({ field: { onChange, value } }) => (
										<Switch
											disabled={!premium}
											onValueChange={checked => toggleNotification(checked, onChange)}
											value={!!value}
										/>
									)}
								/>
							</S.Col>
							{notificationEnabled && (
								<S.Col>
									<S.InuptLabel>{t('notification_date')}</S.InuptLabel>
									<Controller
										control={control}
										rules={{ required: false }}
										name='notification_time'
										render={({ field: { onChange, value } }) => (
											<RNDateTimePicker
												mode='datetime'
												disabled={!notificationEnabled || !premium}
												value={value ? new Date(value) : new Date()}
												onChange={value =>
													onChange(new Date(value.nativeEvent.timestamp).getTime())
												}
												minimumDate={new Date(Date.now() + 1000 * 60 * 60)}
											/>
										)}
									/>
								</S.Col>
							)}
						</S.Row>
					)}

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

export default ListEdit
