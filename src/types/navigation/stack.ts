import { List } from '../models/list'
import { Shop } from '../models/shop'

export type StackParamList = {
	home: undefined
	list: { list: List } | undefined
	shop: { shop: Shop<List>; size: number } | undefined
	rename: { list: List } | undefined
	add: { items: string[]; listId: string; queries: string[] }
	intro: undefined
	auth: undefined
}
