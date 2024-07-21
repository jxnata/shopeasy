import React from 'react'

import * as S from './styles'
import Icon from '../icon'

const ListItem = ({ item }: any) => {
	return (
		<S.Container>
			<S.Column>
				<S.Title>{item.title}</S.Title>
				<S.Description>{item.description}</S.Description>
			</S.Column>
			<Icon name='chevron-forward' />
		</S.Container>
	)
}

export default ListItem
