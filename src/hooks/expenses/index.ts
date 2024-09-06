import { useMemo } from 'react'

import { Shopping } from '../../types/models/shopping'

export const useExpenses = (shoppings: Shopping[]) => {
	const total = useMemo(() => shoppings.reduce((total, list) => total + (list.total || 0), 0), [shoppings])
	const average = useMemo(() => total / shoppings.length, [shoppings.length, total])
	const highest = useMemo(() => shoppings.sort((a, b) => b.total! - a.total!)[0], [shoppings])
	const lowest = useMemo(() => shoppings.sort((a, b) => a.total! - b.total!)[0], [shoppings])

	const totalFirst = useMemo(() => {
		const list = shoppings[0]
		if (!list) return 0
		if (!list.total) return 0
		if (!list.items.length) return list.total || 0

		return list.total / list.items.length
	}, [shoppings])

	const totalLast = useMemo(() => {
		const list = shoppings[shoppings.length - 1]
		if (!list) return 0
		if (!list.total) return 0
		if (!list.items.length) return list.total || 0

		return list.total / list.items.length
	}, [shoppings])

	const variation = useMemo(() => ((totalLast - totalFirst) / totalFirst) * 100, [totalFirst, totalLast])

	return {
		total,
		average,
		highest,
		lowest,
		variation,
	}
}
