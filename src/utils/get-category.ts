import { categoryNumber } from './category-number'
import { getItems } from './get-items'

export const getCategory = (itemName: string) => {
	const items = getItems()

	const item = items.find(i => i.items.includes(itemName))

	if (!item) return { name: 'others', number: 0 }

	return { name: item.category, number: categoryNumber(item.category) }
}
