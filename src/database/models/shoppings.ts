import { ID } from 'appwrite'

import { storage } from '..'
import { ListItem, ListItemData } from '../../types/models/list-item'
import { Shopping, ShoppingData } from '../../types/models/shopping'

export const createShopping = (data: ShoppingData): Shopping => {
	const newList: Shopping = {
		id: ID.unique(),
		...data,
		date: Date.now(),
	}
	const shoppings = getAllShoppings()
	shoppings.push(newList)
	saveShoppings(shoppings)
	return newList
}

export const getShopping = (id: string): Shopping | undefined => {
	const shoppings = getAllShoppings()
	return shoppings.find(list => list.id === id)
}

export const getShoppingsByListId = (listId: string): Shopping[] => {
	const shoppings = getAllShoppings()
	return shoppings.filter(list => list.list_id === listId)
}

export const getAllShoppings = (): Shopping[] => {
	const shoppingsJSON = storage.getString('shoppings')
	return shoppingsJSON ? JSON.parse(shoppingsJSON) : []
}

export const updateShopping = (id: string, updatedList: Partial<Shopping>): void => {
	const shoppings = getAllShoppings()
	const index = shoppings.findIndex(list => list.id === id)
	if (index !== -1) {
		shoppings[index] = { ...shoppings[index], ...updatedList }
		saveShoppings(shoppings)
	}
}

export const deleteShopping = (id: string): void => {
	let shoppings = getAllShoppings()
	shoppings = shoppings.filter(list => list.id !== id)
	saveShoppings(shoppings)
}

const saveShoppings = (shoppings: Shopping[]): void => {
	storage.set('shoppings', JSON.stringify(shoppings))
}

export const addItemToList = (listId: string, item: ListItemData): void => {
	const list = getShopping(listId)
	if (list) {
		list.items.push({ ...item, id: ID.unique() })
		updateShopping(listId, list)
	}
}

export const removeItemFromList = (listId: string, itemId: string): void => {
	const list = getShopping(listId)
	if (list) {
		list.items = list.items.filter(item => item.id !== itemId)
		updateShopping(listId, list)
	}
}

export const updateItemInList = (listId: string, itemId: string, updatedItem: Partial<ListItem>): void => {
	const list = getShopping(listId)
	if (list) {
		const itemIndex = list.items.findIndex(item => item.id === itemId)
		if (itemIndex !== -1) {
			list.items[itemIndex] = { ...list.items[itemIndex], ...updatedItem }

			const total = list.items
				.filter(i => i.checked)
				.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0)

			updateShopping(listId, { ...list, total })
		}
	}
}
