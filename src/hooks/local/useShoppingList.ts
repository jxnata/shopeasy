import { useEffect, useState } from 'react'

import { useShoppingLists } from './useShoppingLists'
import { ShoppingList } from '../../types/models/shopping-list'

export const useShoppingList = (listId: string) => {
	const [list, setList] = useState<ShoppingList | null>(null)
	const { lists } = useShoppingLists()

	useEffect(() => {
		if (!lists) return

		const selectedList = lists.find(l => l.id === listId) || null
		setList(selectedList)
	}, [lists, listId])

	return list
}
