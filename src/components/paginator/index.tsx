import React, { FC } from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import * as S from './styles'

const Paginator: FC<Props> = ({ itemsLength, activeIndex }) => {
	const dotAstyle = useAnimatedStyle(() => {
		return {
			left: withTiming(activeIndex * (8 + 4)),
		}
	})
	return (
		<S.Container>
			{Array.from({ length: itemsLength }).map((_, index) => (
				<S.Dot key={index} />
			))}
			<S.ActiveDot style={dotAstyle} />
		</S.Container>
	)
}

export default Paginator

type Props = {
	itemsLength: number
	activeIndex: number
}
