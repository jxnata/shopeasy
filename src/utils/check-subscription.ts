import Purchases from 'react-native-purchases'

export async function checkSubscription() {
	try {
		const customerInfo = await Purchases.getCustomerInfo()
		const active = customerInfo.entitlements.active

		if (typeof active['monthly'] !== 'undefined' || typeof active['yearly'] !== 'undefined') {
			return true
		}

		return false
	} catch {
		return false
	}
}
