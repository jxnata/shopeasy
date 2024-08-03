import { useMemo } from 'react'

import { Item } from '../../types/models/item'
import { List } from '../../types/models/list'
import { Local } from '../../types/models/local'

export const useCart = (items: Item<List, Local>[]) => {
	const percentage = useMemo(() => {
		return items.length ? Math.round((items.filter(i => i.checked).length / items.length) * 100) : 0
	}, [items])

	const total = useMemo(() => {
		return items.filter(i => i.checked).reduce((acc, item) => acc + (item.price || 0), 0)
	}, [items])

	return {
		percentage,
		total: total ? total / 100 : 0,
	}
}
