import { ListItem } from './list-item'

export interface ShoppingList {
	id: string
	name: string
	finished: boolean
	shopping: boolean
	total: number | null
	items: ListItem[]
	local?: string
	date: number
	notification_id?: string
	notification_time?: number
}

export type ShoppingListData = Omit<ShoppingList, 'id' | 'date'>
