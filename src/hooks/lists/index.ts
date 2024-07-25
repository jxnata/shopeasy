import useSWR from 'swr'

import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { List } from '../../types/models/list'

const fetcher = (queries?: string[]) => databases.listDocuments(DB, MODELS.LISTS, queries).then(res => res)

export const useLists = (queries?: string[], disabled?: boolean) => {
	const { data, error, mutate } = useSWR(disabled ? null : queries, fetcher)

	const lists = data ? data.documents || [] : []

	return {
		lists: lists as List[],
		loading: !error && !data,
		error,
		mutate,
	}
}
