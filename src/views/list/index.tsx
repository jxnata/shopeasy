/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommonActions } from '@react-navigation/native'
import { debounce, toLower, trim } from 'lodash'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, TextInput, useColorScheme } from 'react-native'
import ContextMenu from 'react-native-context-menu-view'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Icon from '../../components/icon'
import Input from '../../components/input'
import ItemRow from '../../components/item'
import ListFooter from '../../components/list-footer'
import SuggestionItem, { SuggestionSkeleton } from '../../components/suggestion-item'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { addItemToList } from '../../database/models/lists'
import { useShoppingList } from '../../hooks/local/useShoppingList'
import { ButtonIcon, ButtonLabel, Container, Label } from '../../theme/global'
import { getSuggestions } from '../../utils/get-suggestions'
import { showInterstitial } from '../../utils/show-interstitial'

function ListView({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined
	const listId = useMemo(() => (listParam ? listParam.id : undefined), [listParam])
	const scheme = useColorScheme()
	const { t } = useTranslation('translation', { keyPrefix: 'list' })

	const { premium } = useSession()

	const [searchTerm, setSearchTerm] = useState('')
	const [sortBy, setSortBy] = useState('creation')
	const [suggestions, setSuggestions] = useState<string[]>([])
	const [loadingSuggestions, setLoadingSuggestions] = useState(false)

	const inputSearchRef = useRef<TextInput>(null)

	const list = useShoppingList(listId)

	const items = useMemo(() => {
		if (!list) return []

		if (sortBy === 'creation') {
			return [...list.items].reverse()
		}

		return [...list.items].sort((a, b) => {
			if (a.checked !== b.checked) return a.checked ? 1 : -1
			return a.name.localeCompare(b.name)
		})
	}, [list, sortBy])

	const itemsList = useMemo(() => items.map(i => i.name), [items])

	const filteredItems = useMemo(() => {
		return items.filter(i => trim(toLower(i.name)).includes(trim(toLower(searchTerm))))
	}, [items, searchTerm])

	const handleChange = (e: string) => {
		setSearchTerm(e)
	}

	const debouncedResults = useMemo(() => {
		return debounce(handleChange, 300)
	}, [])

	const fetchSuggestions = useCallback(async () => {
		try {
			if (!premium) {
				navigation.navigate('subscribe')
				return
			}

			setLoadingSuggestions(true)

			const list = await getSuggestions(itemsList)
			setSuggestions(list)
		} catch {
			toast.error(t('suggestions_error'))
		} finally {
			setLoadingSuggestions(false)
		}
	}, [premium, itemsList, navigation, t])

	const filteredSuggestions = useMemo(() => suggestions.filter(s => !itemsList.includes(s)), [itemsList, suggestions])

	const onAdd = useCallback(() => {
		if (!list) return

		if (!premium && (itemsList.length === 3 || itemsList.length % 10 === 0)) {
			showInterstitial()
		}

		navigation.navigate('add', { items: itemsList, listId: list.id })
	}, [itemsList, list, navigation, premium])

	const onAcceptSuggestion = (name: string) => {
		if (!listId) return
		addItemToList(listId, { name, qty: 1, have: 0, unit: null, price: null, checked: false })
	}

	const onRemoveSuggestion = (name: string) => {
		setSuggestions(suggestions.filter(s => s !== name))
	}

	const onEdit = useCallback(() => {
		if (!list) return
		navigation.navigate('edit', { list })
	}, [list, navigation])

	const onShop = () => {
		if (!list) return

		if (!premium) showInterstitial()

		navigation.dispatch(
			CommonActions.reset({
				index: 1,
				routes: [
					{ name: 'main-stack' },
					{
						name: 'shoppings-stack',
						state: {
							routes: [{ name: 'shoppings' }, { name: 'create-shopping', params: { list } }],
						},
					},
				],
			})
		)
	}

	const createItem = useCallback(() => {
		if (!list || !searchTerm) return

		const newItem = {
			name: searchTerm.trim(),
			have: 0,
			qty: 1,
			unit: null,
			price: null,
			checked: false,
		}
		addItemToList(list.id, newItem)
		setSearchTerm('')

		if (!inputSearchRef.current) return

		inputSearchRef.current.clear()
	}, [list, searchTerm])

	const HeaderRight = useCallback(() => {
		return (
			<S.Row>
				<S.GhostButton onPress={fetchSuggestions} disabled={loadingSuggestions}>
					<Icon name='sparkles' />
				</S.GhostButton>
				<ContextMenu
					title={t('options')}
					actions={[
						{ title: t('creation'), systemIcon: 'list.bullet', selected: sortBy === 'creation' },
						{ title: t('alphabet'), systemIcon: 'a.circle.fill', selected: sortBy === 'alphabet' },
					]}
					onPress={e => {
						switch (e.nativeEvent.index) {
							case 0:
								setSortBy('creation')
								break
							case 1:
								setSortBy('alphabet')
								break
						}
					}}
					dropdownMenuMode
				>
					<S.GhostButton>
						<Icon name='swap-vertical' />
					</S.GhostButton>
				</ContextMenu>
				<S.GhostButton onPress={onEdit}>
					<Icon name='ellipsis-vertical' />
				</S.GhostButton>
			</S.Row>
		)
	}, [fetchSuggestions, loadingSuggestions, onEdit, sortBy, t])

	useEffect(() => {
		return () => {
			debouncedResults.cancel()
		}
	})

	return (
		<Container>
			<S.Content>
				{!!list && (
					<S.Body>
						<Header title={list.name} Right={HeaderRight} backButton />
						{/* <S.ButtonsContainer>
							{itemsList.length > 3 && (
								<S.AddButton onPress={fetchSuggestions} disabled={loadingSuggestions}>
									<Icon name='sparkles' />
									<Label>{t('ai_suggestions')}</Label>
								</S.AddButton>
							)}
						</S.ButtonsContainer> */}
						<Input
							clearButtonMode='always'
							placeholder={t('search_placeholder')}
							onChangeText={debouncedResults}
							ref={inputSearchRef}
							maxLength={32}
						/>
						<S.Separator />
						{!filteredItems.length && (
							<S.EmptyContainer>
								{searchTerm ? (
									<S.AddButton onPress={createItem}>
										<Icon name='add-circle' />
										<Label>
											{t('add')} "{searchTerm.trim()}"
										</Label>
									</S.AddButton>
								) : (
									<S.EmptyText>{t('no_items')}</S.EmptyText>
								)}
							</S.EmptyContainer>
						)}
						<FlatList
							data={filteredItems}
							keyExtractor={item => item.id}
							renderItem={({ item }) => <ItemRow item={item} listId={listId!} />}
							ListFooterComponent={<ListFooter />}
							ListHeaderComponent={
								<>
									{loadingSuggestions && <SuggestionSkeleton />}
									{filteredSuggestions.map(item => (
										<SuggestionItem
											key={item}
											item={item}
											onAccept={onAcceptSuggestion}
											onRemove={onRemoveSuggestion}
										/>
									))}
								</>
							}
							showsVerticalScrollIndicator={false}
							style={{ marginBottom: 12 }}
						/>
						<S.Cart>
							<S.Blur blurType={scheme === 'dark' ? 'dark' : 'light'} />

							<S.OutlineButton
								aria-disabled={!itemsList.length}
								disabled={!itemsList.length}
								onPress={onShop}
							>
								<Icon name='cart' />
								<S.OutlineText>{t('shop_now_button')}</S.OutlineText>
							</S.OutlineButton>

							<S.FinishButton
								aria-disabled={!itemsList.length}
								disabled={!itemsList.length}
								onPress={onAdd}
							>
								<ButtonIcon name='add-circle' />
								<ButtonLabel>{t('add_items')}</ButtonLabel>
							</S.FinishButton>
						</S.Cart>
					</S.Body>
				)}
			</S.Content>
		</Container>
	)
}

export default ListView
