import useSWR from 'swr'

import { MAIN_API_URL } from '../../constants'
import { api } from '../../services/api/main'

const fetcher = (url: string) => api.get(url).then(res => res.data)

export const useLists = () => {
	const { data, error, mutate } = useSWR(`${MAIN_API_URL}/lists`, fetcher)

	return {
		lists: data ? data.documents || [] : [],
		loading: !error && !data,
		error,
		mutate,
	}
}
