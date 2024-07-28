import useSWR from 'swr'

import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { List } from '../../types/models/list'
import { Shop } from '../../types/models/shop'

const fetcher = (queries?: string[]) => databases.listDocuments(DB, MODELS.SHOP, queries).then(res => res)

export const useShops = (queries?: string[], disabled?: boolean) => {
	const { data, error, mutate } = useSWR(disabled ? null : queries, fetcher)

	const shops = data ? data.documents || [] : []

	return {
		shops: shops as Shop<List>[],
		loading: !error && !data,
		error,
		mutate,
	}
}
