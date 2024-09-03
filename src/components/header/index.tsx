import { useNavigation } from '@react-navigation/native'
import React, { ElementType, useEffect } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import * as S from './styles'
import Icon from '../icon'

const Header = ({ title, Right, Left, backButton }: Props) => {
	const headerTranslateY = useSharedValue(-100)
	const navigation = useNavigation()

	const headerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: headerTranslateY.value }],
	}))

	useEffect(() => {
		headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 })
	}, [headerTranslateY])

	const onBack = () => {
		navigation.goBack()
	}

	return (
		<Animated.View style={headerStyle}>
			<S.Head>
				<S.Left>
					{!!Left && <Left />}
					{backButton && navigation.canGoBack() && (
						<S.BackButton onPress={onBack}>
							<Icon name='chevron-back' size={24} />
						</S.BackButton>
					)}
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
	backButton?: boolean
	Left?: ElementType
	Right?: ElementType
}
