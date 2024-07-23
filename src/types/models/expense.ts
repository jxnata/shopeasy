import { type Models } from 'appwrite'

import { Item } from './item'

export interface Expense extends Models.Document {
	price: number
	item: string | Item
}
