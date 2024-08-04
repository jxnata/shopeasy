import { AppleRequestResponse } from '@invertase/react-native-apple-authentication'
import { ExecutionMethod, Models } from 'appwrite'
import { createContext, useContext, useEffect, useState } from 'react'

import { storage } from '../../database'
import { account, functions } from '../../lib/appwrite'
import { checkSubscription } from '../../utils/check-subscription'

type LocalSession = {
	current: Models.User<Models.Preferences> | null
	loading: boolean
	premium: boolean
	login: (appleRequestResponse: AppleRequestResponse) => Promise<void>
	logout: () => Promise<void>
}

type AppSession = Models.User<Models.Preferences> | null

const initialState: LocalSession = {
	current: null,
	loading: true,
	premium: false,
	login: async () => {},
	logout: async () => {},
}

const SessionContext = createContext<LocalSession>(initialState)

export function useSession() {
	return useContext(SessionContext)
}

export function SessionProvider(props: { children: React.ReactNode }) {
	const storedSession = storage.getString('session')
	const localSession: AppSession = storedSession ? JSON.parse(storedSession) : null

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<AppSession>(localSession)
	const [premium, setPremium] = useState(false)

	async function login(appleRequestResponse: AppleRequestResponse) {
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
	}

	async function logout() {
		await account.deleteSession('current')
		setUser(null)
	}

	async function init() {
		try {
			const isPremium = await checkSubscription()
			setPremium(isPremium)

			const loggedIn = await account.get()
			setUser(loggedIn)
			storage.set('session', JSON.stringify(loggedIn))
		} catch {
			setUser(null)
			storage.delete('session')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		init()
	}, [])

	return (
		<SessionContext.Provider value={{ current: user, loading, premium, login, logout }}>
			{props.children}
		</SessionContext.Provider>
	)
}
