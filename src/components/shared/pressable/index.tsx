import React, { useEffect } from 'react'
import { TouchableOpacityProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import * as S from './styles'
import icons from '../../../assets/data/icon-map.json'

const Pressable = (props: Props & TouchableOpacityProps) => {
	const { title, left, right, loading, variant } = props

	const buttonTranslateY = useSharedValue(100)
	const buttonStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: buttonTranslateY.value }],
	}))

	useEffect(() => {
		buttonTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 })
	}, [buttonTranslateY])

	return (
		<Animated.View style={buttonStyle}>
			<S.Button
				aria-disabled={props.disabled}
				aria-label={variant || 'primary'}
				activeOpacity={0.8}
				{...props}
				disabled={props.disabled || props.loading}
			>
				{!!left && <S.ButtonIcon name={left} aria-label={variant || 'primary'} />}
				<S.ButtonLabel aria-label={variant || 'primary'}>{title}</S.ButtonLabel>
				{!!right && (
					<>
						{loading && <S.Spinner />}
						<S.ButtonIcon aria-label={variant || 'primary'} name={right} />
					</>
				)}
			</S.Button>
		</Animated.View>
	)
}

export default Pressable

type Props = {
	title: string
	variant?: 'primary' | 'secondary'
	left?: keyof typeof icons
	right?: keyof typeof icons
	loading?: boolean
	disabled?: boolean
}
