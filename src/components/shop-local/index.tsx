import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ExecutionMethod, ID, Query } from 'appwrite'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import * as S from './styles'
import { DB, MODELS } from '../../constants'
import { databases, functions } from '../../lib/appwrite'
import { Label } from '../../theme/global'
import { List } from '../../types/models/list'
import { Place } from '../../types/models/place'
import Input from '../input'
import Loading from '../loading'
import { toast } from '../toast'

type Props = {
	list: List
}

const ShopLocal = ({ list }: Props) => {
	const { t } = useTranslation('translation', { keyPrefix: 'shop_local' })
	const [search, setSearch] = useState<string>('')
	const [location, setLocation] = useState<Coord>()
	const [loading, setLoading] = useState<boolean>(false)

	const queryClient = useQueryClient()

	const { data: places } = useQuery<Place[]>({
		queryKey: ['places', search, location],
		enabled: !!search,
		queryFn: async () => {
			const result = await functions.createExecution(
				'get-places',
				JSON.stringify({
					latitude: location ? location.latitude.toFixed(5) : 0,
					longitude: location ? location.longitude.toFixed(5) : 0,
					term: search,
				}),
				false,
				undefined,
				ExecutionMethod.POST
			)

			return JSON.parse(result.responseBody) as Place[]
		},
	})

	const debouncedSearch = debounce(async term => {
		setSearch(term)
	}, 500)

	const onSetPlace = async (place: Place) => {
		setLoading(true)
		try {
			const exists = await databases.listDocuments(DB, MODELS.LOCAL, [Query.equal('place', place.place)])

			if (exists.documents.length) {
				await databases.updateDocument(DB, MODELS.LIST, list.$id, {
					local: exists.documents[0].$id,
					name: `${t('shop_in')} ${place.name}`,
				})

				return
			}
			const created = await databases.createDocument(DB, MODELS.LOCAL, ID.unique(), place)

			await databases.updateDocument(DB, MODELS.LIST, list.$id, {
				local: created.$id,
				name: `${t('shop_in')} ${place.name}`,
			})
		} catch {
			toast.error(t('create_place_error'))
		} finally {
			setLoading(false)
			queryClient.invalidateQueries({ queryKey: ['list', list.$id] })
		}
	}

	useEffect(() => {
		Geolocation.getCurrentPosition((info: GeolocationResponse) => setLocation(info.coords))
	}, [])

	if (loading) return <Loading />

	return (
		<S.Container>
			<S.Content>
				<Input
					label={t('local_label')}
					onChangeText={debouncedSearch}
					placeholder={t('local_placeholder')}
					maxLength={32}
					autoFocus
					returnKeyType='search'
				/>
				<FlatList
					data={places || []}
					keyExtractor={item => item.place}
					renderItem={({ item }) => (
						<S.Item onPress={() => onSetPlace(item)}>
							<Label>{item.name}</Label>
							<S.Description>{item.address}</S.Description>
						</S.Item>
					)}
					showsVerticalScrollIndicator={false}
					style={{ marginBottom: 12 }}
				/>
			</S.Content>
		</S.Container>
	)
}

export default ShopLocal

type Coord = {
	latitude: number
	longitude: number
	altitude: number | null
	accuracy: number
	altitudeAccuracy: number | null
	heading: number | null
	speed: number | null
}
