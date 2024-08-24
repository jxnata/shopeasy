import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Loading from '../components/loading'
import { useSession } from '../contexts/session'
import { useSettings } from '../contexts/settings'
import { StackParamList } from '../types/navigation/stack'
import Add from '../views/add'
import Auth from '../views/auth'
import CreateList from '../views/create'
import ListEdit from '../views/edit'
import Expenses from '../views/expenses'
import Home from '../views/home'
import Intro from '../views/intro'
import ListView from '../views/list'
import Onboarding from '../views/onboarding'
import Profile from '../views/profile'
import Purchase from '../views/purchase'
import Subscribe from '../views/subscribe'

const Stack = createNativeStackNavigator<StackParamList>()

const Routes = () => {
	const { initialized, oppened } = useSettings()
	const { current, loading } = useSession()
	const { t } = useTranslation('translation')

	if (loading) return <Loading />

	if (!oppened) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName='intro' screenOptions={{ headerShown: false }}>
					<Stack.Screen name='intro' component={Intro} />
					<Stack.Screen name='onboarding' component={Onboarding} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}

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
				<Stack.Navigator initialRouteName='purchase' screenOptions={{ headerShown: false }}>
					<Stack.Screen name='purchase' component={Purchase} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
				<Stack.Screen name='home' component={Home} options={{ title: t('home.title') }} />
				<Stack.Screen name='expenses' component={Expenses} options={{ title: t('expenses.title') }} />
				<Stack.Screen name='list' component={ListView} options={{ title: t('list.title') }} />
				<Stack.Screen name='subscribe' component={Subscribe} options={{ headerShown: false }} />
				<Stack.Screen name='add' component={Add} options={{ title: t('add.title'), presentation: 'modal' }} />
				<Stack.Screen
					name='create'
					component={CreateList}
					options={{ title: t('list.title'), presentation: 'modal' }}
				/>
				<Stack.Screen
					name='edit'
					component={ListEdit}
					options={{ title: t('rename.title'), presentation: 'modal' }}
				/>
				<Stack.Screen
					name='profile'
					component={Profile}
					options={{ title: t('profile.title'), presentation: 'modal' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Routes
