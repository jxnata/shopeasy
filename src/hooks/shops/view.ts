import useSWR from 'swr'

import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { List } from '../../types/models/list'
import { Shop } from '../../types/models/shop'

const fetcher = (id: string) => databases.getDocument(DB, MODELS.SHOP, id).then(res => res)

export const useViewShop = (id?: string, initialData?: Shop<List>) => {
	const { data, error, mutate } = useSWR(id || null, fetcher)

	return {
		shop: data ? (data as Shop<List>) : initialData,
		loading: !error && !data,
		error,
		mutate,
	}
}
