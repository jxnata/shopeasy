import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import ContextMenu from 'react-native-context-menu-view'

import * as S from './styles'
import { useSession } from '../../contexts/session'
import { createShoppingList, deleteShoppingList } from '../../database/models/lists'
import { ShoppingList } from '../../types/models/shopping-list'
import { StackParamList } from '../../types/navigation/stack'
import { format } from '../../utils/format'
import { showInterstitial } from '../../utils/show-interstitial'
import Icon from '../icon'
import { toast } from '../toast'

const ListRow = ({ item }: Props) => {
	const { premium } = useSession()
	const navigation = useNavigation<ScreenNavigationProp>()

	const { t } = useTranslation('translation', { keyPrefix: 'list' })

	const showIcon = item.notification_id && item.notification_time && item.notification_time > Date.now()

	const onOpenList = () => navigation.navigate('list', { list: item })

	const onCopy = useCallback(() => {
		const data = {
			name: item.name,
			shopping: false,
			finished: false,
			items: item.items.map(i => ({ ...i, checked: false })),
			total: 0,
		}

		const newList = createShoppingList(data)

		if (!premium) showInterstitial()

		navigation.navigate('list', { list: newList })
	}, [item.items, item.name, navigation, premium])

	const onEdit = useCallback(() => {
		navigation.navigate('edit', { list: item })
	}, [item, navigation])

	const onDelete = useCallback(() => {
		if (!item) return
		try {
			deleteShoppingList(item.id)
		} catch {
			toast.error(t('delete_error'))
		}
	}, [item, t])

	const onConfirmCopy = useCallback(() => {
		Alert.alert(t('copy_title'), t('copy_text'), [
			{
				text: t('cancel'),
				style: 'cancel',
			},
			{
				text: t('copy_confirm'),
				onPress: onCopy,
				style: 'default',
			},
		])
	}, [onCopy, t])

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
			<S.Column onPress={onOpenList}>
				<S.Row>
					<S.Title>{item.name}</S.Title>
					{item.finished && <Icon name='checkmark-circle' size={12} />}
					{item.shopping && !item.finished && <Icon name='cart' size={12} />}
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
					{ title: t('copy'), systemIcon: 'doc.on.doc' },
					{ title: t('edit'), systemIcon: 'square.and.pencil' },
					{ title: t('delete'), systemIcon: 'trash', destructive: true },
				]}
				onPress={e => {
					switch (e.nativeEvent.index) {
						case 0:
							onConfirmCopy()
							break
						case 1:
							onEdit()
							break
						case 2:
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

export default ListRow

type Props = {
	item: ShoppingList
}

type ScreenNavigationProp = NativeStackNavigationProp<StackParamList>
