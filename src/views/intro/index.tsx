import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay } from 'react-native-reanimated'

import * as S from './styles'
import { Props } from './types'
import Pressable from '../../components/shared/pressable'
import { Container } from '../../theme/global'

function Intro({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'intro' })

	const logoOpacity = useSharedValue(0)
	const headerTranslateY = useSharedValue(-100)
	const textOpacity = useSharedValue(0)

	const logoStyle = useAnimatedStyle(() => ({
		opacity: logoOpacity.value,
	}))

	const headerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: headerTranslateY.value }],
	}))

	const textStyle = useAnimatedStyle(() => ({
		opacity: textOpacity.value,
	}))

	const onStart = () => navigation.navigate('onboarding')

	useEffect(() => {
		logoOpacity.value = withTiming(1, { duration: 1000 })
		headerTranslateY.value = withDelay(200, withSpring(0, { damping: 15, stiffness: 100 }))
		textOpacity.value = withDelay(400, withSpring(1))
	}, [headerTranslateY, logoOpacity, textOpacity])

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Head>
						<Animated.View style={headerStyle}>
							<S.BigText>{t('title')}</S.BigText>
						</Animated.View>
						<Animated.View style={textStyle}>
							<S.Description>{t('description')}</S.Description>
						</Animated.View>
					</S.Head>
					<Pressable title={t('start_button')} right='arrow-forward-outline' onPress={onStart} />
				</S.Content>
			</S.SafeAreaView>
			<Animated.View style={logoStyle}>
				<S.Logo resizeMode='contain' />
			</Animated.View>
		</Container>
	)
}

export default Intro
