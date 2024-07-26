import { type Models } from 'appwrite'

import { List } from './list'

export interface Shop extends Models.Document {
	name?: string
	list: string | List
}
