import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Loading from '../components/loading'
import { useSession } from '../contexts/session'
import { useSettings } from '../contexts/settings'
import { populateCache } from '../database/cache/provider'
import { StackParamList } from '../types/navigation/stack'
import Add from '../views/add'
import Auth from '../views/auth'
import Home from '../views/home'
import Intro from '../views/intro'
import ListView from '../views/list'
import ListRename from '../views/rename'

const Stack = createNativeStackNavigator<StackParamList>()

const Routes = () => {
	const { initialized } = useSettings()
	const { current, loading } = useSession()

	if (loading) return <Loading />

	if (!current) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName='auth' screenOptions={{ headerShown: false }}>
					<Stack.Screen name='auth' component={Auth} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}

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
				<Stack.Screen name='list' component={ListView} />
				<Stack.Screen name='add' component={Add} />
				<Stack.Screen name='rename' component={ListRename} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Routes
