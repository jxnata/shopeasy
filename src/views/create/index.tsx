import RNDateTimePicker from '@react-native-community/datetimepicker'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { ID } from 'appwrite'
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Switch } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Dropdown from '../../components/dropdown'
import Header from '../../components/header'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { createShoppingList } from '../../database/models/lists'
import { Button, ButtonLabel, Container } from '../../theme/global'
import { ShoppingList, ShoppingListData } from '../../types/models/shopping-list'

function CreateList({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'create' })

	const { premium } = useSession()
	const { control, handleSubmit, watch, setValue } = useForm<Partial<ShoppingList>>({
		defaultValues: { notification_time: Date.now() + 3600000, notification_frequency: 'none' },
	})

	const notificationEnabled = !!watch('notification_id')

	const notificationFrequencies = useMemo(
		() => [
			{ label: t('none'), value: 'none' },
			{ label: t('day'), value: 'day' },
			{ label: t('dayOfWeek'), value: 'dayOfWeek' },
			{ label: t('month'), value: 'month' },
		],
		[t]
	)

	const onSave = async (form: Partial<ShoppingListData>) => {
		if (!form.name) return

		try {
			const data: ShoppingListData = {
				name: form.name,
				items: [],
				notification_id: form.notification_id,
				notification_time: form.notification_time,
				notification_frequency: form.notification_frequency,
			}

			const created = createShoppingList(data)

			if (form.notification_id && form.notification_time) {
				let repeatsComponent

				if (form.notification_frequency !== 'none') {
					repeatsComponent = {
						month: form.notification_frequency === 'month',
						dayOfWeek: form.notification_frequency === 'dayOfWeek',
						day: form.notification_frequency === 'day',
					}
				}

				PushNotificationIOS.addNotificationRequest({
					title: t('notification_title'),
					body: t('notification_description'),
					repeats: form.notification_frequency !== 'none',
					repeatsComponent,
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
					<Header title={t('title')} backButton />
					<Controller
						control={control}
						rules={{ required: true }}
						name='name'
						render={({ field: { onChange, value } }) => (
							<Input
								label={t('list_name')}
								value={value}
								onChangeText={onChange}
								placeholder={t('list_name_placeholder')}
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
						<>
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
							<S.Row>
								{notificationEnabled && (
									<Controller
										control={control}
										rules={{ required: false }}
										name='notification_frequency'
										render={({ field: { onChange, value } }) => (
											<Dropdown
												label={t('notification_frequency')}
												placeholder={t('notification_frequency')}
												options={notificationFrequencies}
												onValueChange={onChange}
												selectedValue={value || ''}
											/>
										)}
									/>
								)}
							</S.Row>
						</>
					)}
					<S.Separator />
					<Button onPress={handleSubmit(onSave)}>
						<ButtonLabel>{t('create_button')}</ButtonLabel>
					</Button>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default CreateList
