import { useMemo } from 'react'

import { ListItem } from '../../types/models/list-item'

export const useCart = (items: ListItem[]) => {
	const percentage = useMemo(() => {
		return items.length ? Math.round((items.filter(i => i.checked).length / items.length) * 100) : 0
	}, [items])

	const total = useMemo(() => {
		return items.filter(i => i.checked).reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0)
	}, [items])

	return {
		percentage,
		total: total ? total / 100 : 0,
	}
}
