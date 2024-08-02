import { useMemo } from 'react'

import { Expense } from '../../types/models/expense'
import { Item } from '../../types/models/item'

export const useCart = (items: Item[], expenses: Expense<Item>[]) => {
	const percentage = useMemo(() => {
		return items && expenses ? Math.round((expenses.length / items.length) * 100) : 0
	}, [expenses, items])

	const total = useMemo(() => {
		return expenses.reduce((acc, expense) => acc + expense.price, 0)
	}, [expenses])

	return {
		percentage,
		total: total ? total / 100 : 0,
	}
}
