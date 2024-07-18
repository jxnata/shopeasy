import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { populateCache } from '../database/cache/provider'
import { StackParamList } from '../types/navigation/stack'
import Home from '../views/home'
import Intro from '../views/intro'

const Stack = createNativeStackNavigator<StackParamList>()

const Routes = () => {
	const initialized = false

	if (!initialized) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName='intro' screenOptions={{ headerShown: false }}>
					<Stack.Screen name='intro' component={Intro} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}

	return (
		<NavigationContainer onStateChange={populateCache}>
			<Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
				<Stack.Screen name='home' component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Routes
