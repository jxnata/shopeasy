import { type Models } from 'appwrite'

export interface List extends Models.Document {
	name: string
	user: string
}
