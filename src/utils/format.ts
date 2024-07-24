import { getLocales, getCurrencies } from 'react-native-localize'

export const format = (value: number) => {
	const { languageCode } = getLocales()[0]
	const currency = getCurrencies()

	return new Intl.NumberFormat(languageCode, {
		style: 'currency',
		currency: currency[0] || 'USD',
	}).format(value)
}
