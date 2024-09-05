import { useEffect, useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'

import { storage } from '../../database'
import { Shopping } from '../../types/models/shopping'

export const useShoppings = () => {
	const [shoppings, setShoppings] = useState<Shopping[]>([])
	const [storageValue] = useMMKVString('shoppings', storage)

	useEffect(() => {
		const storedLists = storageValue ? JSON.parse(storageValue) : []
		setShoppings(storedLists)
	}, [storageValue])

	return { shoppings: shoppings.sort((a, b) => b.date - a.date), setShoppings }
}
