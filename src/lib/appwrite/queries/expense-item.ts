import { Query } from 'appwrite'

export const getExpenseByItemQuery = (itemId: string) => {
	return [Query.orderAsc('$createdAt'), Query.equal('item', itemId), Query.isNotNull('price')]
}
