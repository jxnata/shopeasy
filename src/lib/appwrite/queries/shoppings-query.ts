import { Query } from 'appwrite'

export const getShoppingsQuery = (userId?: string) => {
	return [Query.orderAsc('$createdAt'), Query.equal('user', [userId ? userId : '_'])]
}
