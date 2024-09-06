import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import * as S from './styles'
import { Container } from '../../theme/global'
import Icon from '../icon'
import Pressable from '../shared/pressable'

const Congratulations = () => {
	const headerTranslateY = useSharedValue(-100)
	const navigation = useNavigation()
	const { t } = useTranslation('translation', { keyPrefix: 'congratulations' })

	const headerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: headerTranslateY.value }],
		alignItems: 'center',
		gap: 12,
	}))

	useEffect(() => {
		headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 })
	}, [headerTranslateY])

	const onBack = () => {
		navigation.goBack()
	}

	return (
		<Container>
			<S.Body>
				<Animated.View style={headerStyle}>
					<Icon name='diamond' size={48} />
					<S.Text>{t('title')}</S.Text>
					<S.Description>{t('description')}</S.Description>
					<Pressable onPress={onBack} title={t('back_button')} left='arrow-back' />
				</Animated.View>
			</S.Body>
		</Container>
	)
}

export default Congratulations
