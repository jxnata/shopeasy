import { type Models } from 'appwrite'

import { Local } from './local'

export interface List extends Models.Document {
	name: string
	user: string
	model: boolean
	finished: boolean
	total: number | null
	qty: number | null
	local: Local
}
