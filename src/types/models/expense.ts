import { type Models } from 'appwrite'

import { Shop } from './shop'

export interface Expense<ItemType> extends Models.Document {
	price: number
	item: ItemType
	shop: Shop<string>
}
