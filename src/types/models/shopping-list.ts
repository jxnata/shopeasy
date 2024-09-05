import { ListItem } from './list-item'

export interface ShoppingList {
	id: string
	name: string
	items: ListItem[]
	date: number
	notification_id?: string
	notification_time?: number
	notification_frequency?: 'month' | 'day' | 'dayOfWeek' | 'none'
}

export type ShoppingListData = Omit<ShoppingList, 'id' | 'date'>
