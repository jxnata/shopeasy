import React from 'react'

import * as S from './styles'
import { Container } from '../../theme/global'

function Loading() {
	return (
		<Container>
			<S.Content>
				<S.Loading />
			</S.Content>
		</Container>
	)
}

export default Loading
