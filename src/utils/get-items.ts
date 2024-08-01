import { getLocales } from 'react-native-localize'

import itemsEn from '../assets/data/items-en.json'
import itemsEs from '../assets/data/items-es.json'
import itemsPt from '../assets/data/items-pt.json'

export const getItems = () => {
	const { languageCode } = getLocales()[0]

	switch (languageCode) {
		case 'en':
			return itemsEn
		case 'es':
			return itemsEs
		case 'pt':
			return itemsPt
		default:
			return itemsEn
	}
}
