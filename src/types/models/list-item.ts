export type ListItem = {
	id: string
	name: string
	qty: number
	have: number
	unit: string | null
	price: number | null
	checked: boolean
}

export type ListItemData = Omit<ListItem, 'id'>
