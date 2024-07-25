import useSWR from 'swr'

import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { List } from '../../types/models/list'

const fetcher = (id: string) => databases.getDocument(DB, MODELS.LISTS, id).then(res => res)

export const useViewList = (id?: string, initialData?: List) => {
	const { data, error, mutate } = useSWR(id || null, fetcher)

	return {
		list: data ? (data as List) : initialData,
		loading: !error && !data,
		error,
		mutate,
	}
}
