import { Query } from 'appwrite'

export const getShopQuery = (listId?: string, size?: number) => {
	return [
		Query.select(['$id', 'name', 'qty', 'price', 'unit', 'category']),
		Query.equal('list', [listId ? listId : '_']),
		Query.limit(size || 0),
		Query.orderDesc('category'),
	]
}
