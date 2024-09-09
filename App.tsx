import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React, { useEffect } from 'react'
import { AppState, AppStateStatus, Platform, StatusBar, useColorScheme } from 'react-native'
import mobileAds from 'react-native-google-mobile-ads'
import { useMMKVString } from 'react-native-mmkv'
import Purchases from 'react-native-purchases'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { ThemeProvider } from 'styled-components'

import { toastConfig } from './src/components/toast'
import { REVENUECAT_API_KEY_ANDROID, REVENUECAT_API_KEY_IOS } from './src/constants'
import { SessionProvider } from './src/contexts/session'
import { SettingsProvider } from './src/contexts/settings'
import { settings } from './src/database'
import { clientPersister } from './src/database/cache'
import Routes from './src/routes'
import { AppColor } from './src/types/all/colors'
import { getTheme } from './src/utils/get-theme'

const queryClient = new QueryClient()

function App(): React.JSX.Element {
	const scheme = useColorScheme()
	const [color] = useMMKVString('color', settings)

	function onAppStateChange(status: AppStateStatus) {
		focusManager.setFocused(status === 'active')
	}

	useEffect(() => {
		const subscription = AppState.addEventListener('change', onAppStateChange)

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

	if (!scheme) return <></>

	const colors = getTheme(scheme, (color || 'mono') as AppColor)

	return (
		<SafeAreaProvider>
			<StatusBar
				backgroundColor={colors.background}
				barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
			/>
			<ThemeProvider theme={colors}>
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
