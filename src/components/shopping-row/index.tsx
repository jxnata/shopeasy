import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import ContextMenu from 'react-native-context-menu-view'

import * as S from './styles'
import { deleteShopping } from '../../database/models/shoppings'
import { Shopping } from '../../types/models/shopping'
import { StackParamList } from '../../types/navigation/stack'
import { format } from '../../utils/format'
import Icon from '../icon'
import { toast } from '../toast'

const ShoppingRow = ({ item }: Props) => {
	const navigation = useNavigation<ScreenNavigationProp>()

	const { t } = useTranslation('translation', { keyPrefix: 'list' })

	const showIcon = item.notification_id && item.notification_time && item.notification_time > Date.now()

	const onOpenShopping = () => navigation.navigate('shopping', { shopping: item })

	const onEdit = useCallback(() => {
		navigation.navigate('edit-shopping', { shopping: item })
	}, [item, navigation])

	const onDelete = useCallback(() => {
		if (!item) return
		try {
			deleteShopping(item.id)
		} catch {
			toast.error(t('delete_error'))
		}
	}, [item, t])

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

	return (
		<S.Container>
			<S.Column onPress={onOpenShopping}>
				<S.Row>
					<S.Title>{item.local}</S.Title>
					{item.finished && <Icon name='checkmark-circle' size={12} />}
				</S.Row>
				<S.Row>
					<S.Description>
						{item.total ? format(item.total / 100) : item.items.length + ' ' + t('items')} •{' '}
						{new Date(item.notification_time || item.date).toLocaleDateString()}
					</S.Description>
					{showIcon && <Icon name='notifications' size={12} />}
				</S.Row>
			</S.Column>
			<ContextMenu
				title={t('options')}
				actions={[
					{ title: t('edit'), systemIcon: 'square.and.pencil' },
					{ title: t('delete'), systemIcon: 'trash', destructive: true },
				]}
				onPress={e => {
					switch (e.nativeEvent.index) {
						case 0:
							onEdit()
							break
						case 1:
							onConfirmDelete()
							break
					}
				}}
				style={{
					paddingLeft: 8,
					paddingVertical: 8,
				}}
				dropdownMenuMode
			>
				<Icon name='ellipsis-vertical' />
			</ContextMenu>
		</S.Container>
	)
}

export default ShoppingRow

type Props = {
	item: Shopping
}

type ScreenNavigationProp = NativeStackNavigationProp<StackParamList>
