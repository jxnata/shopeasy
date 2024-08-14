import React, { createContext, useContext } from 'react'
import { useMMKVBoolean, useMMKVListener } from 'react-native-mmkv'

import { settings } from '../../database'

type Settings = {
	oppened: boolean
	initialized: boolean
	buyRejected: boolean
	discountOfferted: boolean
}

const SettingsContext = createContext<Settings>({
	oppened: false,
	initialized: false,
	buyRejected: false,
	discountOfferted: false,
})

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [oppened, setOppened] = useMMKVBoolean('oppened')
	const [initialized, setInitialized] = useMMKVBoolean('initialized')
	const [buyRejected, setBuyRejected] = useMMKVBoolean('buyRejected')
	const [discountOfferted, setDiscountOfferted] = useMMKVBoolean('discountOfferted')

	useMMKVListener(key => {
		switch (key as keyof Settings) {
			case 'initialized':
				setInitialized(settings.getBoolean('initialized') || false)
				break

			case 'oppened':
				setOppened(settings.getBoolean('oppened') || false)
				break

			case 'buyRejected':
				setBuyRejected(settings.getBoolean('buyRejected') || false)
				break

			case 'discountOfferted':
				setDiscountOfferted(settings.getBoolean('discountOfferted') || false)
				break
		}
	}, settings)

	const value = {
		oppened: !!oppened,
		initialized: !!initialized,
		buyRejected: !!buyRejected,
		discountOfferted: !!discountOfferted,
	}

	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
