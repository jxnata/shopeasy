import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

import icons from '../assets/data/icon-map.json'
import Icon from '../components/icon'
import Loading from '../components/loading'
import { useSession } from '../contexts/session'
import { useSettings } from '../contexts/settings'
import { settings } from '../database'
import { AppColor } from '../types/all/colors'
import { StackParamList, TabParamList } from '../types/navigation/stack'
import { getTheme } from '../utils/get-theme'
import Add from '../views/add'
import AddShopping from '../views/add-shopping'
import Auth from '../views/auth'
import CreateList from '../views/create'
import CreateShopping from '../views/create-shopping'
import ListEdit from '../views/edit'
import ShoppingEdit from '../views/edit-shopping'
import Expenses from '../views/expenses'
import Home from '../views/home'
import Intro from '../views/intro'
import ListView from '../views/list'
import Onboarding from '../views/onboarding'
import Profile from '../views/profile'
import Purchase from '../views/purchase'
import ShoppingView from '../views/shopping'
import Shoppings from '../views/shoppings'
import Subscribe from '../views/subscribe'

const Stack = createNativeStackNavigator<StackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

const MainStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name='home' component={Home} />
		<Stack.Screen name='list' component={ListView} />
		<Stack.Screen name='add' component={Add} />
		<Stack.Screen name='create' component={CreateList} />
		<Stack.Screen name='edit' component={ListEdit} />
		<Stack.Screen name='subscribe' component={Subscribe} />
	</Stack.Navigator>
)

const ShoppingsStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name='shoppings' component={Shoppings} />
		<Stack.Screen name='shopping' component={ShoppingView} />
		<Stack.Screen name='add-shopping' component={AddShopping} />
		<Stack.Screen name='edit-shopping' component={ShoppingEdit} />
		<Stack.Screen name='create-shopping' component={CreateShopping} />
		<Stack.Screen name='subscribe' component={Subscribe} />
	</Stack.Navigator>
)

const ExpensesStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name='expenses' component={Expenses} />
		<Stack.Screen name='subscribe' component={Subscribe} />
	</Stack.Navigator>
)

const ProfileStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name='profile' component={Profile} />
		<Stack.Screen name='subscribe' component={Subscribe} />
	</Stack.Navigator>
)

const noTabRoutes: (keyof StackParamList)[] = [
	'create',
	'edit',
	'add',
	'list',
	'subscribe',
	'create-shopping',
	'shopping',
	'edit-shopping',
]

const Routes = () => {
	const { initialized, oppened } = useSettings()
	const { current, loading } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'root' })

	const scheme = useColorScheme()
	const [color] = useMMKVString('color', settings)

	const colors = getTheme(scheme, (color || 'mono') as AppColor)

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
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarStyle: (route => {
						const routeName = getFocusedRouteNameFromRoute(route) ?? ''
						if (noTabRoutes.includes(routeName as keyof StackParamList)) {
							return { display: 'none' }
						}
						return {
							borderTopWidth: 0,
							position: 'absolute',
							bottom: 30,
							left: 20,
							right: 20,
							elevation: 0,
							backgroundColor: colors.secondary,
							borderRadius: 12,
							height: 54,
							paddingBottom: 6,
							paddingTop: 4,
						}
					})(route),
					tabBarLabelStyle: {
						fontFamily: 'Nunito',
						fontSize: 10,
						fontWeight: '500',
					},
					tabBarIcon: ({ focused, color }) => {
						let iconName: keyof typeof icons = 'bag-handle-outline'

						if (route.name === 'main-stack') {
							iconName = focused ? 'bag-handle' : 'bag-handle-outline'
						} else if (route.name === 'shoppings-stack') {
							iconName = focused ? 'cart' : 'cart-outline'
						} else if (route.name === 'expenses-stack') {
							iconName = focused ? 'cash' : 'cash-outline'
						} else if (route.name === 'profile-stack') {
							iconName = focused ? 'person' : 'person-outline'
						}

						return <Icon name={iconName} size={20} color={color} />
					},
					tabBarActiveTintColor: colors.primary,
					tabBarInactiveTintColor: colors.primary + '80',
				})}
			>
				<Tab.Screen name='main-stack' options={{ title: t('lists') }} component={MainStack} />
				<Tab.Screen name='shoppings-stack' options={{ title: t('shoppings') }} component={ShoppingsStack} />
				<Tab.Screen name='expenses-stack' options={{ title: t('expenses') }} component={ExpensesStack} />
				<Tab.Screen name='profile-stack' options={{ title: t('profile') }} component={ProfileStack} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default Routes
