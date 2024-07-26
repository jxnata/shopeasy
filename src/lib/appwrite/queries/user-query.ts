import { Query } from 'appwrite'

export const getUserQuery = (userId?: string) => {
	return [Query.select(['$id', 'name', 'user', '$createdAt']), Query.equal('user', [userId ? userId : '_'])]
}
