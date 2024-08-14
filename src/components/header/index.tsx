import React, { ElementType, useEffect } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import * as S from './styles'

const Header = ({ title, Right, Left }: Props) => {
	const headerTranslateY = useSharedValue(-100)

	const headerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: headerTranslateY.value }],
	}))

	useEffect(() => {
		headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 })
	}, [headerTranslateY])

	return (
		<Animated.View style={headerStyle}>
			<S.Head>
				<S.Left>
					{!!Left && <Left />}
					<S.Text>{title}</S.Text>
				</S.Left>
				{Right ? <Right /> : <View />}
			</S.Head>
		</Animated.View>
	)
}

export default Header

type Props = {
	title: string
	Left?: ElementType
	Right?: ElementType
}
