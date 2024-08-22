import { ListItem } from '../models/list-item'
import { ShoppingList } from '../models/shopping-list'

export type StackParamList = {
	home: undefined
	profile: undefined
	expenses: undefined
	list: { list: ShoppingList } | undefined
	shop: { list: ShoppingList; items?: ListItem[] } | undefined
	rename: { list: ShoppingList } | undefined
	add: { items: string[]; listId: string }
	shoppings: undefined
	subscribe: undefined
	auth: undefined
	intro: undefined
	onboarding: undefined
	purchase: undefined
}
