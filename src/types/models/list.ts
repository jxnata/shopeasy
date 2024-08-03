import { type Models } from 'appwrite'

export interface List extends Models.Document {
	name: string
	user: string
	model: boolean
	finished: boolean
	total: number | null
	qty: number | null
}
