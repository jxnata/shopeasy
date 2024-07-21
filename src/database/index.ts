import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
	id: 'main_storage',
})

export const settings = new MMKV({
	id: 'main_settings',
})

export const cache = new MMKV({
	id: 'cache_storage',
})
