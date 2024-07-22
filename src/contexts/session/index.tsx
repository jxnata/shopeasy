import { ID, Models } from 'appwrite'
import { createContext, useContext, useEffect, useState } from 'react'

import { AUTH_CALLBACK_URL } from '../../constants'
import { account } from '../../lib/appwrite'

type LocalSession = {
	current: Models.Session | Models.User<Models.Preferences> | null
	loading: boolean
	login: (email: string) => Promise<void>
	verify: (userId: string, token: string) => Promise<void>
	logout: () => Promise<void>
}

const initialState: LocalSession = {
	current: null,
	loading: true,
	login: async () => {},
	verify: async () => {},
	logout: async () => {},
}

const SessionContext = createContext<LocalSession>(initialState)

export function useSession() {
	return useContext(SessionContext)
}

export function SessionProvider(props: any) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<Models.Session | Models.User<Models.Preferences> | null>(null)

	async function login(email: string) {
		await account.createMagicURLToken(ID.unique(), email, AUTH_CALLBACK_URL)
	}

	async function verify(userId: string, token: string) {
		const session = await account.createSession(userId, token)
		setUser(session)
	}

	async function logout() {
		await account.deleteSession('current')
		setUser(null)
	}

	async function init() {
		try {
			const loggedIn = await account.get()
			setUser(loggedIn)
		} catch {
			setUser(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		init()
	}, [])

	return (
		<SessionContext.Provider value={{ current: user, loading, login, logout, verify }}>
			{props.children}
		</SessionContext.Provider>
	)
}
