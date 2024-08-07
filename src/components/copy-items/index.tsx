import { useQueryClient } from '@tanstack/react-query'
import { ID } from 'appwrite'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { DB, MODELS } from '../../constants'
import { databases } from '../../lib/appwrite'
import { Item } from '../../types/models/item'
import { Local } from '../../types/models/local'
import { getCurrency } from '../../utils/get-currency'
import Loading from '../loading'
import { Progress } from '../progress'
import { toast } from '../toast'

const CopyItems = ({ items, listId, local }: Props) => {
	const { t } = useTranslation('translation', { keyPrefix: 'copy_items' })
	const [progress, setProgress] = useState<number>(0)

	const queryClient = useQueryClient()

	const createItem = useCallback(
		async (item: Item<string, undefined>) => {
			await databases.createDocument(DB, MODELS.ITEM, ID.unique(), {
				name: item.name,
				qty: item.qty,
				unit: item.unit,
				price: item.price,
				category: item.category,
				checked: false,
				list: listId,
				local: local.$id,
				currency: getCurrency(),
				lat: local.lat,
				lon: local.lon,
			})
		},
		[listId, local]
	)

	const batchCreateItems = useCallback(async () => {
		try {
			const batchSize = 10

			for (let i = 0; i < items.length; i += batchSize) {
				const batch = items.slice(i, Math.min(i + batchSize, items.length))

				await Promise.all(batch.map(item => createItem(item)))
				setProgress(((i + batch.length) / items.length) * 100)
			}

			await databases.updateDocument(DB, MODELS.LIST, listId, { qty: items.length })
		} catch {
			toast.error(t('copy_items_error'))
		} finally {
			queryClient.invalidateQueries({ queryKey: ['list', listId] })
			queryClient.invalidateQueries({ queryKey: ['items-shop', listId] })
		}
	}, [createItem, items, listId, queryClient, t])

	useEffect(() => {
		batchCreateItems()
	}, [batchCreateItems])

	return (
		<S.Container>
			<S.Content>
				<Loading />
				<S.Description>{t('description')}</S.Description>
				<S.Percentage>{Math.round(progress)}%</S.Percentage>
				<Progress percentage={progress} />
			</S.Content>
		</S.Container>
	)
}

export default CopyItems

type Props = {
	items: Item<string, undefined>[]
	listId: string
	local: Local
}
