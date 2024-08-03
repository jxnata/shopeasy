import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
	const firstTimeRef = React.useRef(true)

	useFocusEffect(
		useCallback(() => {
			if (firstTimeRef.current) {
				firstTimeRef.current = false
				return
			}

			refetch()
		}, [refetch])
	)
}
