import { type Models } from 'appwrite'

import { List } from './list'

export interface Item extends Models.Document {
	name: string
	qty: number
	unit?: string
	price?: number
	category: number
	list: string | List
}
