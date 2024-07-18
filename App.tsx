import React, { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { ThemeProvider } from 'styled-components'

import { SWRConfig } from 'swr'
import { cacheProvider, populateCache } from './src/database/cache/provider'
import Routes from './src/routes'
import theme from './src/theme'

function App(): React.JSX.Element {
	const scheme = useColorScheme()

	useEffect(populateCache, [])

	if (!scheme) {
		return <></>
	}

	const colors = theme[scheme]

	return (
		<SafeAreaProvider>
			<StatusBar
				backgroundColor={colors.background}
				barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
			/>
			<ThemeProvider theme={theme[scheme]}>
				<SWRConfig value={{ provider: cacheProvider }}>
					<Routes />
				</SWRConfig>
			</ThemeProvider>
			<Toast position='bottom' />
		</SafeAreaProvider>
	)
}

export default App
