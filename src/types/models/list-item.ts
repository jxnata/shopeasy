export type ListItem = {
	id: string
	name: string
	qty: number
	unit: string | null
	price: number | null
	category: number
	checked: boolean
}

export type ListItemData = Omit<ListItem, 'id'>
