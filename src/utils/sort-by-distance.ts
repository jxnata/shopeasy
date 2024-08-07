import { getDistance } from 'geolib'

import { Item } from '../types/models/item'
import { List } from '../types/models/list'
import { Local } from '../types/models/local'

export const sortByDistance = (items: Item<List, Local>[], userLat: number, userLon: number) => {
	return items.sort((a: Item<List, Local>, b: Item<List, Local>) => {
		const distanceA = getDistance(
			{ latitude: userLat, longitude: userLon },
			{ latitude: a.local.lat || 0, longitude: a.local.lon || 0 }
		)

		const distanceB = getDistance(
			{ latitude: userLat, longitude: userLon },
			{ latitude: b.local.lat || 0, longitude: b.local.lon || 0 }
		)

		return distanceA - distanceB
	})
}
