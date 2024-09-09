import { createContext, useContext, useState } from 'react'

import { checkSubscription } from '../../utils/check-subscription'

type LocalSession = {
	premium: boolean
	checkPremium: () => void
}

const initialState: LocalSession = {
	premium: false,
	checkPremium: async () => {},
}

const SessionContext = createContext<LocalSession>(initialState)

export function useSession() {
	return useContext(SessionContext)
}

export function SessionProvider(props: { children: React.ReactNode }) {
	const [premium, setPremium] = useState(false)

	async function checkPremium() {
		try {
			const isPremium = await checkSubscription()
			setPremium(isPremium)
		} catch {}
	}

	return (
		<SessionContext.Provider
			value={{
				premium,
				checkPremium,
			}}
		>
			{props.children}
		</SessionContext.Provider>
	)
}
