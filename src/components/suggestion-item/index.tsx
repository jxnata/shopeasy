import trim from 'lodash/trim'
import React from 'react'

import * as S from './styles'

const SuggestionItem = ({ item, onPress, inList }: Props) => {
	const handle = () => {
		onPress(trim(item))
	}

	return (
		<S.Container aria-checked={inList} onPress={handle}>
			<S.Text>{item}</S.Text>
			<S.RightIcon aria-checked={inList} name={inList ? 'checkmark-circle' : 'add-circle'} />
		</S.Container>
	)
}

export default SuggestionItem

type Props = {
	item: string
	onPress: (item: string) => void
	inList: boolean
}
