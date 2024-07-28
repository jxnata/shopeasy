import { Query } from 'appwrite'

export const getExpenseQuery = (listId?: string, size?: number) => {
	return [
		Query.select(['$id', 'price', 'item', 'shop']),
		Query.equal('shop', [listId ? listId : '_']),
		Query.limit(size || 0),
	]
}
