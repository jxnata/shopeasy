import { Models } from 'appwrite'
import React from 'react'

import * as S from './styles'
import { List } from '../../types/models/list'
import Icon from '../icon'

const ListItem = ({ item, user, onPress }: Props) => {
	const open = () => onPress(item)

	const name = item.user === user.$id ? user.name : ''

	return (
		<S.Container onPress={open}>
			<S.Column>
				<S.Title>{item.name}</S.Title>
				<S.Description>
					{name ? name + ' •' : ''} {new Date(item.$createdAt).toLocaleDateString()}
				</S.Description>
			</S.Column>
			<Icon name='chevron-forward' />
		</S.Container>
	)
}

export default ListItem

type Props = {
	item: List
	user: Models.User<Models.Preferences>
	onPress: (item: List) => void
}
