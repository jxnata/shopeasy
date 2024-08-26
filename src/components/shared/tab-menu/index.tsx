import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import * as S from './styles'
import icons from '../../../assets/data/icon-map.json'
import { StackParamList } from '../../../types/navigation/stack'

const TabMenu = (props: Props) => {
	const { current, items } = props

	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
	const scheme = useColorScheme()

	const tabTranslateY = useSharedValue(100)
	const tabStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: tabTranslateY.value }],
	}))

	const navigate = (key: keyof StackParamList) => {
		navigation.navigate(key as never)
	}

	useEffect(() => {
		tabTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 })
	}, [tabTranslateY])

	return (
		<Animated.View style={tabStyle}>
			<S.Container>
				<S.TabBar>
					<S.Blur blurType={scheme === 'dark' ? 'dark' : 'light'} />
					<S.Row>
						{items.map(item => (
							<S.TabButton
								aria-selected={current === item.route}
								key={item.route}
								onPress={() => navigate(item.route)}
							>
								<S.TabIcon name={item.icon} />
								<S.TabLabel>{item.title}</S.TabLabel>
							</S.TabButton>
						))}
					</S.Row>
				</S.TabBar>
			</S.Container>
		</Animated.View>
	)
}

export default TabMenu

type Props = {
	current: string
	items: { title: string; icon: keyof typeof icons; route: keyof StackParamList }[]
}
