import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { cache } from '.'

const clientStorage = {
	setItem: (key: string, value: string) => {
		cache.set(key, value)
	},
	getItem: (key: string) => {
		const value = cache.getString(key)
		return value === undefined ? null : value
	},
	removeItem: (key: string) => {
		cache.delete(key)
	},
}

export const clientPersister = createSyncStoragePersister({ storage: clientStorage })
