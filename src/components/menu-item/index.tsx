import React, { useState } from 'react'

import * as S from './styles'
import icons from '../../assets/data/icon-map.json'
import Icon from '../icon'

const MenuItem = (props: Props) => {
	const { title, icon, action, disabled = false } = props
	const [pressed, setPressed] = useState(false)

	return (
		<S.Container
			disabled={disabled}
			onPress={action}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			activeOpacity={0.8}
		>
			<S.IconContainer aria-selected={pressed}>
				<Icon name={icon} size={32} />
			</S.IconContainer>
			<S.TextContainer>
				<S.Text>{title}</S.Text>
			</S.TextContainer>
		</S.Container>
	)
}

export default MenuItem

type IconType = keyof typeof icons
type Props = {
	title: string
	icon: IconType
	action: () => void
	disabled?: boolean
}
