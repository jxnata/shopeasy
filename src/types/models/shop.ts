import { type Models } from 'appwrite'

import { List } from './list'

export interface Shop<ListType> extends Models.Document {
	name?: string
	list: ListType | List
}
