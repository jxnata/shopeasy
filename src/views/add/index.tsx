import debounce from 'lodash/debounce'
import toLower from 'lodash/toLower'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import suggestions from '../../assets/data/items.json'
import Input from '../../components/input'
import SuggestionItem from '../../components/suggestion-item'
import { Container } from '../../theme/global'
import { randomItems } from '../../utils/random-items'

function Add({ navigation, route }: Props) {
	const { items, setItems } = route.params
	const [tempItems, setTempItems] = useState<string[]>(items)
	const { t } = useTranslation('translation', { keyPrefix: 'add' })
	const [search, setSearch] = useState<string>('')
	const inputRef = useRef<TextInput>(null)

	const filteredSuggestions = useMemo(
		() =>
			search ? suggestions.filter(s => s.includes(toLower(search))).slice(0, 10) : randomItems(suggestions, 10),
		[search]
	)

	const pressItem = useCallback(
		(item: string) => {
			setSearch('')
			if (inputRef.current) inputRef.current.clear()

			if (tempItems.includes(toLower(item))) {
				setItems(tempItems.filter(i => i !== item))
				setTempItems(tempItems.filter(i => i !== item))
				return
			}
			setItems([toLower(item), ...tempItems])
			setTempItems([toLower(item), ...tempItems])
		},
		[tempItems, setItems]
	)

	const debouncedSearch = debounce(async term => {
		setSearch(term)
	}, 500)

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
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Add
