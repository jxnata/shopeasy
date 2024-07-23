import { debounce } from 'lodash'
import React, { useState } from 'react'

import * as S from './styles'
import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { Item } from '../../types/models/item'
import Icon from '../icon'

const ItemRow = ({ item, onPress, mutate }: Props) => {
	const [quantity, setQuantity] = useState<number>(item.qty)
	const [deleted, setDeleted] = useState<boolean>(false)

	const debouncedUpdate = debounce(async (q: number) => {
		console.tron.log(q)
	}, 3000)

	// TO-DO: dabounce update items

	const increase = () => {
		debouncedUpdate(quantity + 1)
		setQuantity(old => old + 1)
	}

	const decrease = async () => {
		try {
			debouncedUpdate(quantity - 1)
			if (quantity <= 1) {
				setDeleted(true)
				await databases.deleteDocument(DB, MODELS.ITEMS, item.$id)
				mutate()
			}
			setQuantity(old => old - 1)
		} catch {
			setDeleted(false)
		}
	}

	if (deleted) return null

	return (
		<S.Container>
			<S.Text>{item.name}</S.Text>
			<S.QuantityContainer>
				<S.QuantityButton onPress={decrease}>
					<Icon name={quantity <= 1 ? 'trash-outline' : 'remove'} />
				</S.QuantityButton>
				<S.Text>{quantity}</S.Text>
				<S.QuantityButton onPress={increase}>
					<Icon name='add' />
				</S.QuantityButton>
			</S.QuantityContainer>
		</S.Container>
	)
}

export default ItemRow

type Props = {
	item: Item
	onPress?: (item: Item) => void
	mutate: () => void
}
