import { getCurrencies } from 'react-native-localize'

export const getCurrency = () => {
	const currency = getCurrencies()
	return currency[0]
}
