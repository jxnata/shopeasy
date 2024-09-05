import { Shopping } from '../models/shopping'
import { ShoppingList } from '../models/shopping-list'

export type StackParamList = {
	home: undefined
	profile: undefined
	shoppings: undefined
	shopping: { shopping: Shopping }
	expenses: undefined
	create: undefined
	'create-shopping': { list: ShoppingList }
	list: { list: ShoppingList } | undefined
	edit: { list: ShoppingList } | undefined
	'edit-shopping': { shopping: Shopping } | undefined
	add: { items: string[]; listId: string }
	'add-shopping': { items: string[]; shoppingId: string }
	subscribe: undefined
	auth: undefined
	intro: undefined
	onboarding: undefined
	purchase: undefined
}

export type TabParamList = {
	'main-stack': undefined
	'shoppings-stack': undefined
	'expenses-stack': undefined
	'profile-stack': undefined
	'premium-stack': undefined
}
