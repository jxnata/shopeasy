import { Client, Databases, Account, Functions, Query } from 'appwrite'

import { APPWRITE_PROJECT, MAIN_API_URL } from '../../constants'

const client = new Client()
client.setEndpoint(MAIN_API_URL).setProject(APPWRITE_PROJECT)

export const account = new Account(client)
export const databases = new Databases(client)
export const functions = new Functions(client)

export const queries = {
	listsByUser: (userId?: string) => [
		Query.select(['$id', 'name', 'user', '$createdAt']),
		Query.equal('user', [userId ? userId : '_']),
		Query.equal('model', true),
	],
	listsToExpenses: (userId?: string, extend?: string) => [
		Query.equal('user', [userId ? userId : '_']),
		Query.equal('model', false),
		Query.equal('finished', true),
		Query.equal('extends', [extend ? extend : '_']),
		Query.orderAsc('$createdAt'),
	],
	listsToShop: (userId?: string) => [Query.equal('user', [userId ? userId : '_']), Query.equal('model', false)],
	itemsBylist: (listId?: string) => [
		Query.select(['$id', 'name', 'category', 'price', 'unit', 'qty']),
		Query.equal('list', [listId ? listId : '_']),
		Query.orderDesc('category'),
	],
	itemsByListToShop: (listId?: string) => [
		Query.equal('list', [listId ? listId : '_']),
		Query.limit(1000),
		Query.orderDesc('category'),
	],
	itemsByNameAndLocal: (id: string, name: string, currency: string, lat: number, lon: number) => [
		Query.between('lat', lat - 1, -lat + 1),
		Query.between('lon', lon - 1, lon + 1),
		Query.notEqual('$id', [id]),
		Query.equal('currency', [currency]),
		Query.search('name', name),
		Query.isNotNull('price'),
		Query.limit(10),
		Query.orderAsc('$createdAt'),
	],
}
