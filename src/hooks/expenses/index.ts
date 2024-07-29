import useSWR from 'swr'

import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { Expense } from '../../types/models/expense'
import { Item } from '../../types/models/item'

const fetcher = (queries?: string[]) => databases.listDocuments(DB, MODELS.EXPENSES, queries).then(res => res)

export const useExpenses = (queries?: string[], disabled?: boolean) => {
	const { data, error, mutate } = useSWR(disabled ? null : queries, fetcher)

	const expenses = data ? data.documents || [] : []

	return {
		expenses: expenses as Expense<Item>[],
		loading: !error && !data,
		error,
		mutate,
	}
}
