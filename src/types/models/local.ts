import { type Models } from 'appwrite'

export interface Local extends Models.Document {
	place: string | null
	name: string
	address: string | null
	lat: number | null
	lon: number | null
}
