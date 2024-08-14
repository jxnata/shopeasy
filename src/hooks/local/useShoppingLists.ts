import { useEffect, useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'

import { ShoppingList } from '../../types/models/shopping-list'

export const useShoppingLists = () => {
	const [lists, setLists] = useState<ShoppingList[]>([])
	const [storageValue] = useMMKVString('shopping_lists')

	useEffect(() => {
		const storedLists = storageValue ? JSON.parse(storageValue) : []
		setLists(storedLists)
	}, [storageValue])

	return { lists }
}
