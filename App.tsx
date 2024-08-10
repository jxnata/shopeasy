import Geolocation from '@react-native-community/geolocation'
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React, { useEffect } from 'react'
import { AppState, AppStateStatus, Platform, StatusBar, useColorScheme } from 'react-native'
import mobileAds from 'react-native-google-mobile-ads'
import { OneSignal } from 'react-native-onesignal'
import Purchases from 'react-native-purchases'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { ThemeProvider } from 'styled-components'

import { toastConfig } from './src/components/toast'
import { ONE_SIGNAL_APP_ID, REVENUECAT_API_KEY_ANDROID, REVENUECAT_API_KEY_IOS } from './src/constants'
import { SessionProvider } from './src/contexts/session'
import { SettingsProvider } from './src/contexts/settings'
import { clientPersister } from './src/database/cache'
import Routes from './src/routes'
import theme from './src/theme'

const queryClient = new QueryClient()

function App(): React.JSX.Element {
	const scheme = useColorScheme()

	function onAppStateChange(status: AppStateStatus) {
		focusManager.setFocused(status === 'active')
	}

	useEffect(() => {
		const subscription = AppState.addEventListener('change', onAppStateChange)

		Geolocation.requestAuthorization()

		return () => subscription.remove()
	}, [])

	useEffect(() => {
		if (Platform.OS === 'ios') {
			Purchases.configure({ apiKey: REVENUECAT_API_KEY_IOS })
		} else if (Platform.OS === 'android') {
			Purchases.configure({ apiKey: REVENUECAT_API_KEY_ANDROID })
		}

		mobileAds().initialize()
	}, [])

	useEffect(() => {
		OneSignal.initialize(ONE_SIGNAL_APP_ID)

		OneSignal.Notifications.requestPermission(true)
	}, [])

	if (!scheme) return <></>

	const colors = theme[scheme]

	return (
		<SafeAreaProvider>
			<StatusBar
				backgroundColor={colors.background}
				barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
			/>
			<ThemeProvider theme={theme[scheme]}>
				<PersistQueryClientProvider client={queryClient} persistOptions={{ persister: clientPersister }}>
					<QueryClientProvider client={queryClient}>
						<SessionProvider>
							<SettingsProvider>
								<Routes />
							</SettingsProvider>
						</SessionProvider>
					</QueryClientProvider>
				</PersistQueryClientProvider>
			</ThemeProvider>
			<Toast position='bottom' config={toastConfig(scheme)} bottomOffset={120} />
		</SafeAreaProvider>
	)
}

export default App
