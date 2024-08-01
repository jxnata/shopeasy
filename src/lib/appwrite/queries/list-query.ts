import { Query } from 'appwrite'

export const getListQuery = (listId?: string) => {
	return [
		Query.select(['$id', 'name', 'category', 'price', 'unit', 'qty']),
		Query.equal('list', [listId ? listId : '_']),
		Query.orderDesc('category'),
	]
}
