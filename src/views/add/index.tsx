import { ID } from 'appwrite'
import debounce from 'lodash/debounce'
import flatten from 'lodash/flatten'
import toLower from 'lodash/toLower'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Input from '../../components/input'
import SuggestionItem from '../../components/suggestion-item'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useItems } from '../../hooks/items'
import { databases } from '../../lib/appwrite'
import { Button, ButtonIcon, ButtonLabel, Container } from '../../theme/global'
import { getCategory } from '../../utils/get-category'
import { getItems } from '../../utils/get-items'
import { getPermissions } from '../../utils/get-permissions'
import { randomItems } from '../../utils/random-items'

function Add({ navigation, route }: Props) {
	const { items, listId, queries } = route.params
	const { current } = useSession()
	const [tempItems, setTempItems] = useState<string[]>(items)
	const { t } = useTranslation('translation', { keyPrefix: 'add' })
	const [search, setSearch] = useState<string>('')
	const inputRef = useRef<TextInput>(null)
	const { mutate } = useItems(queries)

	const suggestions = useMemo(() => getItems(), [])

	const filteredSuggestions = useMemo(() => {
		const flattened = flatten(suggestions.map(s => s.items))

		if (!search) return randomItems(flattened, 10)

		return flattened.filter(s => s.includes(toLower(search))).slice(0, 10)
	}, [search, suggestions])

	const createItem = useCallback(
		async (name: string) => {
			if (!current || !name || !listId) return

			try {
				await databases.createDocument(
					DB,
					MODELS.ITEMS,
					ID.unique(),
					{ name, qty: 1, list: listId, category: getCategory(name).number },
					getPermissions(current.$id)
				)
			} catch {
				setTempItems(tempItems.filter(i => i !== name))
			}
		},
		[current, listId, tempItems]
	)

	const pressItem = useCallback(
		(item: string) => {
			setSearch('')
			if (inputRef.current) inputRef.current.clear()

			if (tempItems.includes(toLower(item))) {
				setTempItems(tempItems.filter(i => i !== item))
				return
			}
			setTempItems([toLower(item), ...tempItems])
			createItem(item)
		},
		[createItem, tempItems]
	)

	const debouncedSearch = debounce(async term => {
		setSearch(term)
	}, 500)

	const goBack = () => navigation.goBack()

	useEffect(() => {
		return () => {
			mutate()
		}
	}, [mutate])

	return (
		<Container>
			<S.Content>
				<S.Header>
					<S.Title>{t('title')}</S.Title>
				</S.Header>
				<S.Body>
					<Input
						ref={inputRef}
						onChangeText={debouncedSearch}
						clearButtonMode='while-editing'
						placeholder={t('search_placeholder')}
						autoCapitalize='none'
						autoComplete='off'
						autoCorrect={false}
						maxLength={32}
						autoFocus
					/>
					<S.Scroll>
						<S.Suggestions>
							{filteredSuggestions.map((item, i) => (
								<SuggestionItem
									key={i}
									item={item}
									inList={tempItems.includes(toLower(item))}
									onPress={pressItem}
								/>
							))}
							{filteredSuggestions.length === 0 && search.length > 0 && (
								<S.Empty>
									<SuggestionItem
										item={toLower(search)}
										inList={tempItems.includes(toLower(search))}
										onPress={pressItem}
									/>
								</S.Empty>
							)}
						</S.Suggestions>
					</S.Scroll>
					<Button onPress={goBack}>
						<ButtonIcon name='checkmark-circle' />
						<ButtonLabel>{t('confirm_button')}</ButtonLabel>
					</Button>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Add
