import React, { FC, useMemo } from 'react'
import { Dimensions, ImageSourcePropType } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, withTiming, withSpring, withDelay } from 'react-native-reanimated'

import * as S from './styles'

const SCREEN_WIDTH = Dimensions.get('screen').width - 24

const BouncyOnbarodingItem: FC<Props> = ({ item, index, scrollX }) => {
	const inputRange = useMemo(() => {
		const start = (index - 1) * SCREEN_WIDTH
		const end = (index + 1) * SCREEN_WIDTH
		return [start, index * SCREEN_WIDTH, end]
	}, [index])

	const titleAStyle = useAnimatedStyle(() => {
		const titleTranslateX = interpolate(scrollX.value, inputRange, [SCREEN_WIDTH, 0, -SCREEN_WIDTH])

		return {
			transform: [{ translateX: withDelay(0, withSpring(titleTranslateX)) }],
		}
	})
	const descriptionAStyle = useAnimatedStyle(() => {
		const descriptionTrnalsateX = interpolate(scrollX.value, inputRange, [SCREEN_WIDTH, 0, -SCREEN_WIDTH])

		return {
			transform: [{ translateX: withDelay(100, withSpring(descriptionTrnalsateX)) }],
		}
	})
	const imageAStyle = useAnimatedStyle(() => {
		const imageTranslateX = interpolate(scrollX.value, inputRange, [SCREEN_WIDTH, 0, -SCREEN_WIDTH])

		return {
			transform: [{ translateX: withDelay(300, withTiming(imageTranslateX)) }],
		}
	})
	return (
		<S.Container>
			<S.Title style={titleAStyle}>{item.title}</S.Title>
			<S.Description style={descriptionAStyle}>{item.description}</S.Description>
			<S.Image style={imageAStyle} source={item.image} />
		</S.Container>
	)
}

export default BouncyOnbarodingItem

type Props = {
	item: {
		title: string
		description: string
		image: ImageSourcePropType
	}
	index: number
	scrollX: Animated.SharedValue<number>
}
