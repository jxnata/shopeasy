import useSWR from 'swr'

import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { List } from '../../types/models/list'

const fetcher = (queries?: string[]) => databases.listDocuments(DB, MODELS.LISTS, queries).then(res => res)

export const useLists = (queries?: string[]) => {
	const { data, error, mutate } = useSWR(queries, fetcher)

	const lists = data ? data.documents || [] : []

	return {
		lists: lists as List[],
		loading: !error && !data,
		error,
		mutate,
	}
}
