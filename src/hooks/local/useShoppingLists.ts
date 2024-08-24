import { useEffect, useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'

import { storage } from '../../database'
import { ShoppingList } from '../../types/models/shopping-list'

export const useShoppingLists = () => {
	const [lists, setLists] = useState<ShoppingList[]>([])
	const [storageValue] = useMMKVString('shopping-lists', storage)

	useEffect(() => {
		const storedLists = storageValue ? JSON.parse(storageValue) : []
		setLists(storedLists)
	}, [storageValue])

	return { lists: lists.sort((a, b) => b.date - a.date), setLists }
}
