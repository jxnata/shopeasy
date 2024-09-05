import { useEffect, useState } from 'react'

import { useShoppings } from './useShoppings'
import { Shopping } from '../../types/models/shopping'

export const useShopping = (shopId?: string) => {
	const [shopping, setShopping] = useState<Shopping | null>(null)
	const { shoppings } = useShoppings()

	useEffect(() => {
		if (!shoppings) return

		const selectedShopping = shoppings.find(s => s.id === shopId) || null
		setShopping(selectedShopping)
	}, [shoppings, shopId])

	return shopping
}
