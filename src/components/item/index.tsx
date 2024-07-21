import React from 'react'

import * as S from './styles'
import Icon from '../icon'

const Item = ({ item, onPress }: any) => {
	return (
		<S.Container>
			<S.Text>{item.name}</S.Text>
			<S.QuantityContainer>
				<S.QuantityButton>
					<Icon name='remove' />
				</S.QuantityButton>
				<S.Text>{item.qty}</S.Text>
				<S.QuantityButton>
					<Icon name='add' />
				</S.QuantityButton>
			</S.QuantityContainer>
		</S.Container>
	)
}

export default Item
