import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
    id: 'main_storage',
})

export const cache = new MMKV({
    id: 'cache_storage',
})
