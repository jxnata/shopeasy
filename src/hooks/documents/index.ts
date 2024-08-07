import { DefinedInitialDataOptions, QueryKey, useQuery } from '@tanstack/react-query'
import { Models } from 'appwrite'

export const useDocuments = <T>(options: DefinedInitialDataOptions<unknown, Error, Models.Document, QueryKey>) => {
	const { data, error, isFetching, refetch } = useQuery(options)

	return {
		data: (data ? data.documents || [] : []) as T,
		total: data.total ? data.total : 0,
		loading: isFetching,
		error,
		mutate: refetch,
	}
}

export const useDocument = <T>(options: DefinedInitialDataOptions<unknown, Error, Models.Document, QueryKey>) => {
	const { data, error, isLoading, refetch } = useQuery(options)

	return {
		data: data as T,
		loading: isLoading,
		error,
		mutate: refetch,
	}
}
