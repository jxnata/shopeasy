import { Models } from 'appwrite'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { ShoppingList } from '../../types/models/shopping-list'
import { format } from '../../utils/format'
import Icon from '../icon'

const ListRow = ({ item, onPress, onCopy }: Props) => {
	const open = () => onPress(item)
	const copy = () => onCopy(item)

	const { t } = useTranslation('translation', { keyPrefix: 'list' })

	const showIcon = item.notification_id && item.notification_time && item.notification_time > Date.now()

	return (
		<S.Container>
			<S.Column onPress={open}>
				<S.Title>{item.name}</S.Title>
				<S.Row>
					<S.Description>
						{item.total ? format(item.total / 100) : item.items.length + ' ' + t('items')} •{' '}
						{new Date(item.notification_time || item.date).toLocaleDateString()}
					</S.Description>
					{showIcon && <Icon name='notifications' size={12} />}
				</S.Row>
			</S.Column>
			<S.CopyButton onPress={copy}>
				<Icon name='copy-outline' />
			</S.CopyButton>
		</S.Container>
	)
}

export default ListRow

type Props = {
	item: ShoppingList
	user: Models.User<Models.Preferences>
	onPress: (item: ShoppingList) => void
	onCopy: (item: ShoppingList) => void
}
