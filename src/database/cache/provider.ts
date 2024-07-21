import { Cache } from 'swr'

import { cache } from '..'
import KEYS from '../types/keys'

const map = new Map(JSON.parse(cache.getString(KEYS.CACHE) || '[]'))

export function populateCache() {
	const appCache = JSON.stringify(Array.from(map.entries()))
	cache.set(KEYS.CACHE, appCache)
}

export function cacheProvider() {
	return map as Cache
}
