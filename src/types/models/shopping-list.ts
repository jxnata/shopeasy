import { ListItem } from './list-item'

export interface ShoppingList {
	id: string
	name: string
	finished: boolean
	total: number | null
	qty: number | null
	items: ListItem[]
	local: string
}

export type ShoppingListData = Omit<ShoppingList, 'id'>
