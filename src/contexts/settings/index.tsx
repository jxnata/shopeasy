import React, { createContext, useContext, useState } from 'react'
import { useMMKVListener } from 'react-native-mmkv'

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
	const [oppened, setOppened] = useState(settings.getBoolean('oppened') || false)
	const [initialized, setInitialized] = useState(settings.getBoolean('initialized') || false)
	const [buyRejected, setBuyRejected] = useState(settings.getBoolean('buyRejected') || false)
	const [discountOfferted, setDiscountOfferted] = useState(settings.getBoolean('discountOfferted') || false)

	useMMKVListener(key => {
		switch (key as keyof Settings) {
			case 'initialized':
				return setInitialized(settings.getBoolean('initialized') || false)

			case 'oppened':
				return setOppened(settings.getBoolean('oppened') || false)

			case 'buyRejected':
				return setBuyRejected(settings.getBoolean('buyRejected') || false)

			case 'discountOfferted':
				return setDiscountOfferted(settings.getBoolean('discountOfferted') || false)
		}
	}, settings)

	const value = {
		oppened,
		initialized,
		buyRejected,
		discountOfferted,
	}

	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
