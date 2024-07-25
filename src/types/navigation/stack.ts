import { List } from '../models/list'

export type StackParamList = {
	home: undefined
	list: { list: List } | undefined
	rename: { list: List } | undefined
	add: { items: string[]; listId: string; queries: string[] }
	intro: undefined
	auth: undefined
}
