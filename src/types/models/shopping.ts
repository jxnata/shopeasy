import { ListItem } from './list-item'

export interface Shopping {
	id: string
	list_id: string
	local: string
	finished: boolean
	total: number
	items: ListItem[]
	date: number
}

export type ShoppingData = Omit<Shopping, 'id' | 'date'>
