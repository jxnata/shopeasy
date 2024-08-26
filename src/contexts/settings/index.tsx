/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, useContext } from 'react'
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv'

import { settings } from '../../database'
import { AppColor } from '../../types/all/colors'

type Settings = {
	oppened: boolean
	initialized: boolean
	buyRejected: boolean
	discountOfferted: boolean
	color: AppColor
	setOppened: (value: boolean) => void
	setInitialized: (value: boolean) => void
	setBuyRejected: (value: boolean) => void
	setDiscountOfferted: (value: boolean) => void
	setColor: (value: AppColor) => void
}

const SettingsContext = createContext<Settings>({
	oppened: false,
	initialized: false,
	buyRejected: false,
	discountOfferted: false,
	color: 'mono',
	setOppened: () => {},
	setInitialized: () => {},
	setBuyRejected: () => {},
	setDiscountOfferted: () => {},
	setColor: () => {},
})

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [oppened, setOppened] = useMMKVBoolean('oppened', settings)
	const [initialized, setInitialized] = useMMKVBoolean('initialized', settings)
	const [buyRejected, setBuyRejected] = useMMKVBoolean('buyRejected', settings)
	const [discountOfferted, setDiscountOfferted] = useMMKVBoolean('discountOfferted', settings)
	const [color, setColor] = useMMKVString('color', settings)

	const value = {
		oppened: !!oppened,
		initialized: !!initialized,
		buyRejected: !!buyRejected,
		discountOfferted: !!discountOfferted,
		color: color || 'mono',
		setOppened,
		setInitialized,
		setBuyRejected,
		setDiscountOfferted,
		setColor,
	}

	// @ts-ignore
	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
