import { useMemo } from 'react'

import { List } from '../../types/models/list'

export const useExpenses = (lists: List[]) => {
	const total = useMemo(() => lists.reduce((total, list) => total + (list.total || 0), 0), [lists])
	const average = useMemo(() => total / lists.length, [lists.length, total])
	const highest = useMemo(() => lists.sort((a, b) => b.total! - a.total!)[0], [lists])
	const lowest = useMemo(() => lists.sort((a, b) => a.total! - b.total!)[0], [lists])

	const totalFirst = useMemo(() => {
		const list = lists[0]
		if (!list) return 0
		if (!list.total) return 0
		if (!list.qty) return list.total || 0

		return list.total / list.qty
	}, [lists])

	const totalLast = useMemo(() => {
		const list = lists[lists.length - 1]
		if (!list) return 0
		if (!list.total) return 0
		if (!list.qty) return list.total || 0

		return list.total / list.qty
	}, [lists])

	const variation = useMemo(() => ((totalLast - totalFirst) / totalFirst) * 100, [totalFirst, totalLast])

	return {
		total,
		average,
		highest,
		lowest,
		variation,
	}
}
