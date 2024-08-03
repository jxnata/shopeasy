import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { List } from '../../types/models/list'
import Icon from '../icon'

const ShopItem = ({ item, onPress }: Props) => {
	const { t } = useTranslation('translation', { keyPrefix: 'shoppings' })
	const open = () => onPress(item)

	return (
		<S.Container onPress={open}>
			<S.Column>
				<S.Title>{item.name || t('no_name')}</S.Title>
				<S.Description>{new Date(item.$createdAt).toLocaleDateString()}</S.Description>
			</S.Column>
			<Icon name='chevron-forward' />
		</S.Container>
	)
}

export default ShopItem

type Props = {
	item: List
	onPress: (item: List) => void
}
