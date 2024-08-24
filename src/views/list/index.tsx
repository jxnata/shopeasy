import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList, useColorScheme } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Icon from '../../components/icon'
import ItemRow from '../../components/item'
import ListFooter from '../../components/list-footer'
import Options from '../../components/options'
import { Progress } from '../../components/progress'
import SuggestionItem, { SuggestionSkeleton } from '../../components/suggestion-item'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { addItemToList, deleteShoppingList, updateShoppingList } from '../../database/models/lists'
import { useCart } from '../../hooks/cart'
import { useShoppingList } from '../../hooks/local/useShoppingList'
import { ButtonIcon, ButtonLabel, Container, Label } from '../../theme/global'
import { format } from '../../utils/format'
import { getSuggestions } from '../../utils/get-suggestions'

function ListView({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined
	const listId = useMemo(() => (listParam ? listParam.id : undefined), [listParam])
	const scheme = useColorScheme()
	const { t } = useTranslation('translation', { keyPrefix: 'list' })

	const { premium } = useSession()

	const [optionsOpen, setOptionsOpen] = useState(false)
	const [suggestions, setSuggestions] = useState<string[]>([])
	const [loadingSuggestions, setLoadingSuggestions] = useState(false)

	const list = useShoppingList(listId)

	const items = useMemo(() => {
		if (!list) return []

		return [...list.items].sort((a, b) => {
			if (a.checked !== b.checked) return a.checked ? 1 : -1
			return a.name.localeCompare(b.name)
		})
	}, [list])

	const { percentage, total } = useCart(items)

	const itemsList = useMemo(() => items.map(i => i.name), [items])

	const fetchSuggestions = useCallback(async () => {
		try {
			if (premium) {
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

	const toggle = useCallback(() => setOptionsOpen(old => !old), [])

	const onAdd = () => {
		if (!list) return
		navigation.navigate('add', { items: itemsList, listId: list.id })
	}

	const onAcceptSuggestion = (name: string) => {
		if (!listId) return
		addItemToList(listId, { name, qty: 1, have: 0, unit: null, price: null, checked: false })
	}

	const onRemoveSuggestion = (name: string) => {
		setSuggestions(suggestions.filter(s => s !== name))
	}

	const onRename = () => {
		if (!list) return
		setOptionsOpen(false)
		navigation.navigate('rename', { list })
	}

	const onDelete = async () => {
		if (!list) return
		try {
			deleteShoppingList(list.id)
			navigation.goBack()
		} catch {
			toast.error(t('delete_error'))
		}
	}

	const onConfirmDelete = () => {
		setOptionsOpen(false)
		Alert.alert(t('delete_title'), t('delete_text'), [
			{
				text: t('cancel'),
				style: 'cancel',
			},
			{
				text: t('delete_confirm'),
				onPress: onDelete,
				style: 'default',
			},
		])
	}

	const onFinish = () => {
		if (!list) return
		updateShoppingList(list.id, { finished: true })
	}

	const onShop = () => {
		if (!list) return
		updateShoppingList(list.id, { shopping: true })
	}

	const HeaderRight = useCallback(() => {
		return (
			<S.GhostButton onPress={toggle}>
				<Icon name='ellipsis-vertical' />
			</S.GhostButton>
		)
	}, [toggle])

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header title={list ? list.name : t('title')} Right={HeaderRight} />
					{!!list && (
						<S.ButtonsContainer>
							{itemsList.length > 3 && (
								<S.AddButton onPress={fetchSuggestions} disabled={loadingSuggestions}>
									<Icon name='sparkles' />
									<Label>{t('ai_suggestions')}</Label>
								</S.AddButton>
							)}
							<S.AddButton onPress={onAdd}>
								<Icon name='add-circle' />
								<Label>{t('add_items')}</Label>
							</S.AddButton>
						</S.ButtonsContainer>
					)}
					<FlatList
						data={items}
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
					{list && list.shopping && (
						<S.Cart>
							<S.Blur blurType={scheme === 'dark' ? 'dark' : 'light'} />
							<S.CartLeft>
								<S.CartTotal>
									<S.Total>{t('total')}</S.Total>
									<Label>{format(total)}</Label>
								</S.CartTotal>
								<Progress percentage={percentage} />
							</S.CartLeft>
							{!list.finished && (
								<S.FinishButton onPress={onFinish}>
									<ButtonIcon name='checkmark-circle' />
									<ButtonLabel>{t('finish')}</ButtonLabel>
								</S.FinishButton>
							)}
						</S.Cart>
					)}
					{list && !list.shopping && (
						<S.Cart>
							<S.Blur blurType={scheme === 'dark' ? 'dark' : 'light'} />
							<S.CartLeft>
								<Label>
									{itemsList.length} {t('items')}
								</Label>
							</S.CartLeft>
							<S.FinishButton
								aria-disabled={!itemsList.length}
								disabled={!itemsList.length}
								onPress={onShop}
							>
								<ButtonIcon name='cart' />
								<ButtonLabel>{t('shop_now_button')}</ButtonLabel>
							</S.FinishButton>
						</S.Cart>
					)}
					<Options open={optionsOpen} onClose={toggle}>
						<S.OptionButton onPress={onRename}>
							<Icon name='create' />
							<Label>{t('edit_option')}</Label>
						</S.OptionButton>
						<S.OptionButton onPress={onConfirmDelete}>
							<Icon name='trash' />
							<Label>{t('delete_option')}</Label>
						</S.OptionButton>
					</Options>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default ListView
