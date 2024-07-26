import { type Models } from 'appwrite'

import { Item } from './item'
import { Shop } from './shop'

export interface Expense extends Models.Document {
	price: number
	item: string | Item
	shop: Shop
}
