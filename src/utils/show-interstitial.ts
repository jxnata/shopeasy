import { Platform } from 'react-native'
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads'

import { ADMOB_INTERSTITIAL_ID_ANDROID, ADMOB_INTERSTITIAL_ID_IOS } from '../constants'

export const showInterstitial = async () => {
	const id = __DEV__
		? TestIds.INTERSTITIAL
		: Platform.OS === 'ios'
			? ADMOB_INTERSTITIAL_ID_IOS
			: ADMOB_INTERSTITIAL_ID_ANDROID

	const interstitial = InterstitialAd.createForAdRequest(id)

	interstitial.addAdEventListener(AdEventType.LOADED, () => {
		interstitial.show()
	})

	interstitial.load()
}
