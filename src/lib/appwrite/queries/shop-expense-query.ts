import { Query } from 'appwrite'

export const getShopExpenseQuery = (shopId?: string, size?: number) => {
	return [Query.equal('shop', [shopId ? shopId : '_']), Query.limit(size || 0)]
}
