import { Item } from '../models/item'
import { List } from '../models/list'

export type StackParamList = {
	home: undefined
	list: { list: List } | undefined
	shop: { list: List; items?: Item<List, undefined>[] } | undefined
	rename: { list: List } | undefined
	add: { items: string[]; listId: string }
	shoppings: undefined
	subscribe: undefined
	intro: undefined
	auth: undefined
}
