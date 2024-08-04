import React, { createContext, useContext, useState } from 'react'
import { useMMKVListener } from 'react-native-mmkv'

import { settings } from '../../database'

type Settings = {
	initialized: boolean
	buyRejected: boolean
	discountOfferted: boolean
}

const SettingsContext = createContext<Settings>({
	initialized: false,
	buyRejected: false,
	discountOfferted: false,
})

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [initialized, setInitialized] = useState(settings.getBoolean('initialized') || false)
	const [buyRejected, setBuyRejected] = useState(settings.getBoolean('buyRejected') || false)
	const [discountOfferted, setDiscountOfferted] = useState(settings.getBoolean('discountOfferted') || false)

	useMMKVListener(key => {
		switch (key as keyof Settings) {
			case 'initialized':
				return setInitialized(settings.getBoolean('initialized') || false)

			case 'buyRejected':
				return setBuyRejected(settings.getBoolean('buyRejected') || false)

			case 'discountOfferted':
				return setDiscountOfferted(settings.getBoolean('discountOfferted') || false)
		}
	}, settings)

	const value = {
		initialized,
		buyRejected,
		discountOfferted,
	}

	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
