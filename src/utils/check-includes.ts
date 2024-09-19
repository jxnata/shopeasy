import { toLower, trim } from 'lodash'

export function checkIncludes(items: string[], name: string) {
	try {
		const include = items.find(item => trim(toLower(item)) === trim(toLower(name)))

		return !!include
	} catch {
		return false
	}
}
