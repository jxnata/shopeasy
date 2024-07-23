import { type Models } from 'appwrite'

import { List } from './list'

export interface Item extends Models.Document {
	name: string
	qty: number
	unit?: string
	price?: number
	category: string
	list: string | List
}
