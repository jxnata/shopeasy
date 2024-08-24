import RNDateTimePicker from '@react-native-community/datetimepicker'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { ID } from 'appwrite'
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Switch } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { createShoppingList } from '../../database/models/lists'
import { Button, ButtonLabel, Container } from '../../theme/global'
import { ShoppingList, ShoppingListData } from '../../types/models/shopping-list'

function CreateList({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'create' })

	const { current, premium } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])
	const { control, handleSubmit, watch, setValue } = useForm<Partial<ShoppingList>>()

	const notificationEnabled = !!watch('notification_id')

	const onSave = async (form: Partial<ShoppingListData>) => {
		if (!currentId || !form.name) return

		try {
			const data: ShoppingListData = {
				name: form.name,
				shopping: false,
				finished: false,
				items: [],
				total: 0,
				notification_id: form.notification_id,
			}

			const created = createShoppingList(data)

			if (form.notification_id && form.notification_time) {
				PushNotificationIOS.addNotificationRequest({
					title: t('notification_title'),
					body: t('notification_body'),
					repeats: false,
					fireDate: new Date(form.notification_time),
					id: form.notification_id,
				})
			}

			navigation.replace('list', { list: created })
		} catch {
			toast.error(t('create_error'))
		}
	}

	const toggleNotification = (value: boolean, onChange: (value: boolean) => void) => {
		onChange(value)
		setValue('notification_id', value ? ID.unique() : undefined)
	}

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header title={t('title')} />
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
								autoFocus
							/>
						)}
					/>
					{!premium && (
						<S.NoticeBox>
							<S.Notice>{t('premium_notice')}</S.Notice>
						</S.NoticeBox>
					)}
					{premium && (
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
						<ButtonLabel>{t('create_button')}</ButtonLabel>
					</Button>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default CreateList
