import Geolocation from '@react-native-community/geolocation'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OneSignal } from 'react-native-onesignal'
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Pressable from '../../components/shared/pressable'
import { ONE_SIGNAL_APP_ID } from '../../constants'
import { settings } from '../../database'
import { Container } from '../../theme/global'

function Permissions({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'permissions' })
	const [activeIndex, setActiveIndex] = useState(0)
	const [loading, setLoading] = useState(false)

	const boxTranslateY = useSharedValue(100)
	const logoOpacity = useSharedValue(0)

	const boxStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: boxTranslateY.value }],
		opacity: logoOpacity.value,
	}))

	useEffect(() => {
		logoOpacity.value = withTiming(1, { duration: 500 })
		boxTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 })
	}, [boxTranslateY, logoOpacity])

	const onComplete = () => {
		settings.set('oppened', true)
	}

	const denyPermission = useCallback(() => {
		setActiveIndex(old => old + 1)
	}, [])

	const requestLocationPermission = useCallback(async () => {
		setLoading(true)
		Geolocation.requestAuthorization(
			() => setActiveIndex(1),
			() => setActiveIndex(1)
		)
		setTimeout(() => {
			setLoading(false)
			setActiveIndex(1)
		}, 1000)
	}, [])

	const requesNotificationPermission = useCallback(async () => {
		setLoading(true)
		OneSignal.initialize(ONE_SIGNAL_APP_ID)

		await OneSignal.Notifications.requestPermission(true)
		setActiveIndex(2)
		setLoading(false)
	}, [])

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<Header title={t('title')} />
					{activeIndex === 0 && (
						<S.PermissionContainer style={[boxStyle]}>
							<S.Image source={require('../../assets/images/location.png')} />
							<S.Text>{t('location_description')}</S.Text>
							<S.ButtonGroup>
								<Pressable
									disabled={loading}
									title={t('deny')}
									right='close-circle'
									variant='secondary'
									onPress={denyPermission}
								/>
								<Pressable
									loading={loading}
									title={t('allow')}
									right='checkmark-circle'
									onPress={requestLocationPermission}
								/>
							</S.ButtonGroup>
						</S.PermissionContainer>
					)}
					{activeIndex === 1 && (
						<S.PermissionContainer style={[boxStyle]}>
							<S.Image source={require('../../assets/images/push.png')} />
							<S.Text>{t('notification_description')}</S.Text>
							<S.ButtonGroup>
								<Pressable
									disabled={loading}
									title={t('deny')}
									right='close-circle'
									variant='secondary'
									onPress={denyPermission}
								/>
								<Pressable
									loading={loading}
									title={t('allow')}
									right='checkmark-circle'
									onPress={requesNotificationPermission}
								/>
							</S.ButtonGroup>
						</S.PermissionContainer>
					)}
					{activeIndex === 2 && (
						<S.PermissionContainer style={[boxStyle]}>
							<S.Image source={require('../../assets/images/done.png')} />
							<S.Text>{t('done_description')}</S.Text>
							<Pressable title={t('continue')} right='arrow-forward-outline' onPress={onComplete} />
						</S.PermissionContainer>
					)}
				</S.Content>
			</S.SafeAreaView>
		</Container>
	)
}

export default Permissions
