import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

import * as S from './styles'

const SkeletonBase: React.FC<Props> = ({ width, height, radius }) => {
	const opacityValue = useRef(new Animated.Value(0)).current
	const translateValue = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.loop(
			Animated.parallel([
				Animated.sequence([
					Animated.timing(opacityValue, {
						toValue: 1,
						duration: 1000,
						useNativeDriver: true,
					}),
					Animated.timing(opacityValue, {
						toValue: 0,
						duration: 1000,
						useNativeDriver: true,
					}),
				]),
				Animated.sequence([
					Animated.timing(translateValue, {
						toValue: 1,
						duration: 1000,
						useNativeDriver: true,
					}),
					Animated.timing(translateValue, {
						toValue: 0,
						duration: 1000,
						useNativeDriver: true,
					}),
				]),
			])
		).start()
	}, [opacityValue, translateValue])

	const translateX = translateValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-350, 350],
	})

	const animatedStyle = {
		opacity: opacityValue,
		transform: [{ translateX }],
	}

	return (
		<S.SkeletonContainer width={width} height={height} radius={radius}>
			<S.SkeletonAnimation style={animatedStyle} />
		</S.SkeletonContainer>
	)
}

export default SkeletonBase

type Props = {
	width?: string | number
	height?: string | number
	radius?: string | number
}
