import { useEffect, useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'

import { storage } from '../../database'
import { Shopping } from '../../types/models/shopping'

export const useShoppings = () => {
	const [storageValue] = useMMKVString('shoppings', storage)
	const [shoppings, setShoppings] = useState<Shopping[]>(storageValue ? JSON.parse(storageValue) : [])

	useEffect(() => {
		const storedLists = storageValue ? JSON.parse(storageValue) : []
		setShoppings(storedLists)
	}, [storageValue])

	return { shoppings: shoppings.sort((a, b) => b.date - a.date), setShoppings }
}
