import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import BarChart from '../../components/bar-chart'
import Dropdown from '../../components/dropdown'
import Header from '../../components/header'
import Icon from '../../components/icon'
import Pressable from '../../components/shared/pressable'
import { useSession } from '../../contexts/session'
import { useExpenses } from '../../hooks/expenses'
import { useShoppingLists } from '../../hooks/local/useShoppingLists'
import { useShoppings } from '../../hooks/local/useShoppings'
import { Container } from '../../theme/global'
import { ShoppingList } from '../../types/models/shopping-list'
import { format } from '../../utils/format'

function Expenses({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'expenses' })
	const [selectedList, setSelectedList] = useState<ShoppingList>()
	const { premium } = useSession()
	const scheme = useColorScheme()
	const selectedListId = useMemo(() => (selectedList ? selectedList.id : undefined), [selectedList])

	const { lists } = useShoppingLists()

	const { shoppings } = useShoppings()

	const shoppingsByList = useMemo(
		() => shoppings.filter(e => e.list_id === selectedListId),
		[shoppings, selectedListId]
	)

	const { average, highest, lowest, total, variation } = useExpenses(shoppingsByList)

	const selectList = useCallback((listId: string) => setSelectedList(lists.find(l => l.id === listId)), [lists])

	const dropdownLists = useMemo(() => lists.map(l => ({ label: l.name, value: l.id })), [lists])

	const chartData = useMemo(() => {
		if (!shoppings) return []

		return shoppings.map(e => ({
			label: new Date(e.date).toLocaleDateString(),
			value: e.total ? e.total / 100 : 0,
		}))
	}, [shoppings])

	const displayChart = useMemo(() => !!average && !!total && !!highest && !!lowest, [average, highest, lowest, total])

	const onGoPremium = useCallback(() => {
		navigation.navigate('subscribe')
	}, [navigation])

	if (dropdownLists.length === 0) {
		return (
			<Container>
				<S.Content>
					<S.Body>
						<S.EmptyContainer>
							<S.EmptyText>{t('no_list')}</S.EmptyText>
						</S.EmptyContainer>
					</S.Body>
				</S.Content>
			</Container>
		)
	}

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header title={t('title')} />
					<Dropdown
						label={t('select_list')}
						placeholder={t('select_list')}
						options={dropdownLists}
						selectedValue={selectedListId || ''}
						onValueChange={value => selectList(value)}
					/>
					{!!selectedListId && !shoppingsByList.length && (
						<S.EmptyContainer>
							<S.EmptyText>{t('no_expenses')}</S.EmptyText>
						</S.EmptyContainer>
					)}
					{!!selectedListId && !!shoppingsByList.length && (
						<S.Scroll showsVerticalScrollIndicator={false}>
							<S.InfoContainer>
								<S.InfoRow>
									<S.InfoLabel>{t('total')}</S.InfoLabel>
									<S.InfoValue>{format(total / 100)}</S.InfoValue>
								</S.InfoRow>
								<S.InfoRow>
									<S.InfoLabel>{t('average')}</S.InfoLabel>
									<S.InfoValue>{format(average / 100)}</S.InfoValue>
								</S.InfoRow>
								{!!highest && (
									<S.InfoRow>
										<S.InfoLabel>{t('higher')}</S.InfoLabel>
										<S.InfoRight>
											<S.InfoSmallTitle>{highest.local}</S.InfoSmallTitle>
											<S.InfoSmallText>
												{new Date(highest.date).toLocaleDateString()}
											</S.InfoSmallText>
										</S.InfoRight>
									</S.InfoRow>
								)}
								{!!lowest && (
									<S.InfoRow>
										<S.InfoLabel>{t('lower')}</S.InfoLabel>
										<S.InfoRight>
											<S.InfoSmallTitle>{lowest.local}</S.InfoSmallTitle>
											<S.InfoSmallText>
												{new Date(lowest.date).toLocaleDateString()}
											</S.InfoSmallText>
										</S.InfoRight>
									</S.InfoRow>
								)}
								{!!variation && (
									<S.InfoRow>
										<S.InfoLabel>{t('variation')}</S.InfoLabel>
										<S.InfoRight>
											<S.InfoPercentage aria-checked={variation > 0}>
												{variation > 0 ? '+' : '-'}
												{variation.toFixed(2)}%
											</S.InfoPercentage>
											<S.InfoSmallText>
												{variation > 0 ? t('variation_increase') : t('variation_decrease')}
											</S.InfoSmallText>
										</S.InfoRight>
									</S.InfoRow>
								)}
							</S.InfoContainer>
							{chartData.length > 0 && displayChart && (
								<S.InfoContainer>
									<BarChart data={chartData} />
								</S.InfoContainer>
							)}
							<S.Separator />
						</S.Scroll>
					)}
					{!premium && (
						<>
							<S.Blur blurType={scheme === 'dark' ? 'dark' : 'light'} />
							<S.BlurContainer>
								<S.BlurContent>
									<Icon name='diamond' size={24} />
									<S.EmptyText>{t('premium_feature')}</S.EmptyText>
									<Pressable
										title={t('premium_button')}
										onPress={onGoPremium}
										right='arrow-forward'
									/>
								</S.BlurContent>
							</S.BlurContainer>
						</>
					)}
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Expenses
