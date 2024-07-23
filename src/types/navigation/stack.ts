import { List } from '../models/list'

export type StackParamList = {
	home: undefined
	create: { list: List } | undefined
	add: { items: string[]; listId: string; queries: string[] }
	intro: undefined
	auth: undefined
}
