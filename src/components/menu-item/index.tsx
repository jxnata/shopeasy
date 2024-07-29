import React from 'react'

import * as S from './styles'

const MenuItem = (props: Props) => {
	const { title, icon, action, disabled = false } = props

	return (
		<S.Container disabled={disabled} onPress={action}>
			<S.IconContainer>{icon}</S.IconContainer>
			<S.TextContainer>
				<S.Text>{title}</S.Text>
			</S.TextContainer>
		</S.Container>
	)
}

export default MenuItem

type Props = {
	title: string
	icon: string
	action: () => void
	disabled?: boolean
}
