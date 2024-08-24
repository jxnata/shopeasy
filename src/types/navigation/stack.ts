import { ShoppingList } from '../models/shopping-list'

export type StackParamList = {
	home: undefined
	profile: undefined
	expenses: undefined
	create: undefined
	list: { list: ShoppingList } | undefined
	edit: { list: ShoppingList } | undefined
	add: { items: string[]; listId: string }
	subscribe: undefined
	auth: undefined
	intro: undefined
	onboarding: undefined
	purchase: undefined
}
