import { ListItem } from './list-item'

export interface ShoppingList {
	id: string
	name: string
	finished: boolean
	total: number | null
	items: ListItem[]
	local: string
	date: number
}

export type ShoppingListData = Omit<ShoppingList, 'id' | 'date'>
