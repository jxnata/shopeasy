import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native'

import Loading from '../components/loading'
import { useSession } from '../contexts/session'
import { useSettings } from '../contexts/settings'
import theme from '../theme'
import { StackParamList } from '../types/navigation/stack'
import Add from '../views/add'
import Auth from '../views/auth'
import Expenses from '../views/expenses'
import Home from '../views/home'
import Intro from '../views/intro'
import ListView from '../views/list'
import Onboarding from '../views/onboarding'
import Permissions from '../views/permissions'
import Profile from '../views/profile'
import Purchase from '../views/purchase'
import ListRename from '../views/rename'
import ShopView from '../views/shop'
import Shoppings from '../views/shoppings'
import Subscribe from '../views/subscribe'

const Stack = createNativeStackNavigator<StackParamList>()

const Routes = () => {
	const { initialized, oppened } = useSettings()
	const { current, loading } = useSession()
	const { t } = useTranslation('translation')

	const scheme = useColorScheme()
	const colors = theme[scheme!]

	const options: NativeStackNavigationOptions = {
		headerStyle: {
			backgroundColor: colors.background,
		},
		headerTitleStyle: {
			color: colors.foreground,
			fontFamily: 'Nunito',
			fontWeight: 'bold',
		},
		headerTintColor: colors.foreground,
		headerBackTitleStyle: {
			fontFamily: 'Nunito',
		},
		headerShadowVisible: false,
	}
	console.tron.log(initialized)
	if (loading) return <Loading />

	if (!oppened) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName='intro' screenOptions={{ headerShown: false }}>
					<Stack.Screen name='intro' component={Intro} />
					<Stack.Screen name='onboarding' component={Onboarding} />
					<Stack.Screen name='permissions' component={Permissions} />
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
			<Stack.Navigator initialRouteName='home' screenOptions={options}>
				<Stack.Screen name='home' component={Home} options={{ title: t('home.title') }} />
				<Stack.Screen name='profile' component={Profile} options={{ title: t('profile.title') }} />
				<Stack.Screen name='expenses' component={Expenses} options={{ title: t('expenses.title') }} />
				<Stack.Screen name='list' component={ListView} options={{ title: t('list.title') }} />
				<Stack.Screen name='add' component={Add} options={{ title: t('add.title') }} />
				<Stack.Screen name='rename' component={ListRename} options={{ title: t('rename.title') }} />
				<Stack.Screen name='shop' component={ShopView} options={{ title: t('shop.title') }} />
				<Stack.Screen name='shoppings' component={Shoppings} options={{ title: t('shoppings.title') }} />
				<Stack.Screen name='subscribe' component={Subscribe} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Routes
