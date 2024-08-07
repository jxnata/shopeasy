import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useMemo } from 'react'
import { Platform } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

import * as S from './styles'
import { ADMOB_BANNER_ID_ANDROID, ADMOB_BANNER_ID_IOS } from '../../constants'
import { useSession } from '../../contexts/session'
import { StackParamList } from '../../types/navigation/stack'

function Banner() {
	const { premium } = useSession()
	const navigation = useNavigation<ScreenNavigationProp>()

	const id = useMemo(() => {
		if (__DEV__) return TestIds.BANNER

		if (Platform.OS === 'ios') {
			return ADMOB_BANNER_ID_IOS
		} else {
			return ADMOB_BANNER_ID_ANDROID
		}
	}, [])

	const onClose = () => navigation.navigate('subscribe')

	if (premium) return null

	return (
		<S.Content>
			<S.CloseButton onPress={onClose}>
				<S.X>✕</S.X>
			</S.CloseButton>
			<BannerAd unitId={id} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
		</S.Content>
	)
}

export default Banner

type ScreenNavigationProp = NativeStackNavigationProp<StackParamList>
