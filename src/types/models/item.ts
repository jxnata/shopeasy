import { type Models } from 'appwrite'

export interface Item<ListType, LocalType> extends Models.Document {
	name: string
	qty: number
	unit: string | null
	price: number | null
	category: number
	checked: boolean
	list: ListType
	local: LocalType
}
