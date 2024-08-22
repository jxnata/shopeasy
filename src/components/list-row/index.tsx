import { Models } from 'appwrite'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { ShoppingList } from '../../types/models/shopping-list'
import Icon from '../icon'

const ListRow = ({ item, onPress, onCopy }: Props) => {
	const open = () => onPress(item)
	const copy = () => onCopy(item)

	const { t } = useTranslation('translation', { keyPrefix: 'list' })

	return (
		<S.Container>
			<S.Column onPress={open}>
				<S.Title>{item.name}</S.Title>
				<S.Description>
					{item.items.length} {t('items')} • {new Date(item.date).toLocaleDateString()}
				</S.Description>
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
