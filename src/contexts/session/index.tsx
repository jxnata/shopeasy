import { AppleRequestResponse } from '@invertase/react-native-apple-authentication'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { ExecutionMethod, Models } from 'appwrite'
import { createContext, useContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { OneSignal } from 'react-native-onesignal'

import { settings } from '../../database'
import { account, functions } from '../../lib/appwrite'
import { checkSubscription } from '../../utils/check-subscription'

type LocalSession = {
	current: Models.User<Models.Preferences> | null
	loading: boolean
	premium: boolean
	appleAuthentication: (appleRequestResponse: AppleRequestResponse) => Promise<void>
	googleAuthentication: (user: User) => Promise<void>
	logout: () => Promise<void>
	checkPremium: () => void
}

type AppSession = Models.User<Models.Preferences> | null

const initialState: LocalSession = {
	current: null,
	loading: true,
	premium: false,
	appleAuthentication: async () => {},
	googleAuthentication: async () => {},
	logout: async () => {},
	checkPremium: async () => {},
}

const SessionContext = createContext<LocalSession>(initialState)

export function useSession() {
	return useContext(SessionContext)
}

export function SessionProvider(props: { children: React.ReactNode }) {
	const storedSession = settings.getString('session')
	const localSession: AppSession = storedSession ? JSON.parse(storedSession) : null

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<AppSession>(localSession)
	const [premium, setPremium] = useState(false)

	async function appleAuthentication(appleRequestResponse: AppleRequestResponse) {
		try {
			setLoading(true)

			const result = await functions.createExecution(
				'apple-auth',
				JSON.stringify(appleRequestResponse),
				false,
				undefined,
				ExecutionMethod.POST
			)

			if (result.responseStatusCode !== 200) throw new Error(result.responseBody)

			const token: Models.Token = JSON.parse(result.responseBody)

			await account.createSession(token.userId, token.secret)

			await init()
		} finally {
			setLoading(false)
		}
	}

	async function googleAuthentication(user: User) {
		try {
			setLoading(true)

			const result = await functions.createExecution(
				'google-auth',
				JSON.stringify({ idToken: user.idToken }),
				false,
				undefined,
				ExecutionMethod.POST
			)

			if (result.responseStatusCode !== 200) throw new Error(result.responseBody)

			const token: Models.Token = JSON.parse(result.responseBody)

			await account.createSession(token.userId, token.secret)

			await init()
		} finally {
			setLoading(false)
		}
	}

	async function logout() {
		if (Platform.OS === 'android') {
			await GoogleSignin.signOut()
		}
		await account.deleteSession('current')
		setUser(null)
	}

	async function checkPremium() {
		try {
			const isPremium = await checkSubscription()
			setPremium(isPremium)
		} catch {}
	}

	async function init() {
		try {
			const loggedIn = await account.get()
			setUser(loggedIn)
			settings.set('session', JSON.stringify(loggedIn))

			OneSignal.login(loggedIn.$id)
			OneSignal.User.addEmail(loggedIn.email)
		} catch {
			setUser(null)
			settings.delete('session')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		init()
	}, [])

	return (
		<SessionContext.Provider
			value={{ current: user, loading, premium, appleAuthentication, googleAuthentication, logout, checkPremium }}
		>
			{props.children}
		</SessionContext.Provider>
	)
}
