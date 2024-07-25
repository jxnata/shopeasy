import useSWR from 'swr'

import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { Item } from '../../types/models/item'

const fetcher = (queries?: string[]) => databases.listDocuments(DB, MODELS.ITEMS, queries).then(res => res)

export const useItems = (queries?: string[], disabled?: boolean) => {
	const { data, error, mutate } = useSWR(disabled ? null : queries, fetcher)

	const items = data ? data.documents || [] : []

	return {
		items: items as Item[],
		loading: !error && !data,
		error,
		mutate,
	}
}
