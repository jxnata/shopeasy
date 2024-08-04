import Purchases from 'react-native-purchases'

export const getOfferings = async () => {
	try {
		const offerings = await Purchases.getOfferings()
		if (offerings.current === null) return []

		return offerings.current.availablePackages
	} catch {
		return []
	}
}
