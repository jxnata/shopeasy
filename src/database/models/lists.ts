import { ID } from 'appwrite'

import { storage } from '..'
import { ListItem, ListItemData } from '../../types/models/list-item'
import { ShoppingList, ShoppingListData } from '../../types/models/shopping-list'

export const createShoppingList = (data: ShoppingListData): ShoppingList => {
	const newList: ShoppingList = {
		id: ID.unique(),
		...data,
		date: Date.now(),
	}
	const lists = getAllShoppingLists()
	lists.push(newList)
	saveShoppingLists(lists)
	return newList
}

export const getShoppingList = (id: string): ShoppingList | undefined => {
	const lists = getAllShoppingLists()
	return lists.find(list => list.id === id)
}

export const getAllShoppingLists = (): ShoppingList[] => {
	const listsJSON = storage.getString('shopping-lists')
	return listsJSON ? JSON.parse(listsJSON) : []
}

export const updateShoppingList = (id: string, updatedList: Partial<ShoppingList>): void => {
	const lists = getAllShoppingLists()
	const index = lists.findIndex(list => list.id === id)
	if (index !== -1) {
		lists[index] = { ...lists[index], ...updatedList }
		saveShoppingLists(lists)
	}
}

export const deleteShoppingList = (id: string): void => {
	let lists = getAllShoppingLists()
	lists = lists.filter(list => list.id !== id)
	saveShoppingLists(lists)
}

const saveShoppingLists = (lists: ShoppingList[]): void => {
	storage.set('shopping-lists', JSON.stringify(lists))
}

export const addItemToList = (listId: string, item: ListItemData): void => {
	const list = getShoppingList(listId)
	if (list) {
		list.items.push({ ...item, id: ID.unique() })
		updateShoppingList(listId, list)
	}
}

export const removeItemFromList = (listId: string, itemId: string): void => {
	const list = getShoppingList(listId)
	if (list) {
		list.items = list.items.filter(item => item.id !== itemId)
		updateShoppingList(listId, list)
	}
}

export const updateItemInList = (listId: string, itemId: string, updatedItem: Partial<ListItem>): void => {
	const list = getShoppingList(listId)
	if (list) {
		const itemIndex = list.items.findIndex(item => item.id === itemId)
		if (itemIndex !== -1) {
			list.items[itemIndex] = { ...list.items[itemIndex], ...updatedItem }

			const total = list.items
				.filter(i => i.checked)
				.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0)

			updateShoppingList(listId, { ...list, total })
		}
	}
}
