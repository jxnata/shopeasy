import React, { useState } from 'react'

import * as S from './styles'

const MenuItem = (props: Props) => {
	const { title, icon, action, disabled = false } = props
	const [pressed, setPressed] = useState(false)

	return (
		<S.Container
			disabled={disabled}
			onPress={action}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			aria-selected={pressed}
		>
			<S.IconContainer>{icon}</S.IconContainer>
			<S.TextContainer>
				<S.Text aria-selected={pressed}>{title}</S.Text>
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
