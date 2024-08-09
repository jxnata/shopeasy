import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import Banner from '../../components/banner'
import Dropdown from '../../components/dropdown'
import Loading from '../../components/loading'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useDocuments } from '../../hooks/documents'
import { useExpenses } from '../../hooks/expenses'
import { databases, queries } from '../../lib/appwrite'
import { Container } from '../../theme/global'
import { List } from '../../types/models/list'
import { format } from '../../utils/format'

function Expenses({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'expenses' })
	const [selectedList, setSelectedList] = useState<List>()
	const { current } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])
	const selectedListId = useMemo(() => (selectedList ? selectedList.$id : undefined), [selectedList])

	const { data: lists, loading } = useDocuments<List[]>({
		queryKey: ['lists', currentId],
		initialData: [],
		enabled: !!currentId,
		queryFn: async () => await databases.listDocuments(DB, MODELS.LIST, queries.listsByUser(currentId)),
	})

	const { data: expenses } = useDocuments<List[]>({
		queryKey: ['lists-expenses', selectedListId],
		initialData: [],
		enabled: !!selectedListId,
		queryFn: async () =>
			await databases.listDocuments(DB, MODELS.LIST, queries.listsToExpenses(currentId, selectedListId)),
	})

	const { average, highest, lowest, total, variation } = useExpenses(expenses)

	const selectList = useCallback((listId: string) => setSelectedList(lists.find(l => l.$id === listId)), [lists])

	const dropdownLists = useMemo(() => lists.map(l => ({ label: l.name, value: l.$id })), [lists])

	if (!current || loading) return <Loading />

	if (dropdownLists.length === 0) {
		return (
			<Container>
				<S.Content>
					<S.Body>
						<S.EmptyContainer>
							<S.InfoValue>{t('no_list')}</S.InfoValue>
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
					<Dropdown
						label={t('list')}
						placeholder={t('select_list')}
						options={dropdownLists}
						selectedValue={selectedListId || ''}
						onValueChange={value => selectList(value)}
					/>
					{!!selectedListId && (
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
										<S.InfoSmallTitle>{highest.local.name}</S.InfoSmallTitle>
										<S.InfoSmallText>
											{new Date(highest.$createdAt).toLocaleDateString()}
										</S.InfoSmallText>
									</S.InfoRight>
								</S.InfoRow>
							)}
							{!!lowest && (
								<S.InfoRow>
									<S.InfoLabel>{t('lower')}</S.InfoLabel>
									<S.InfoRight>
										<S.InfoSmallTitle>{lowest.local.name}</S.InfoSmallTitle>
										<S.InfoSmallText>
											{new Date(lowest.$createdAt).toLocaleDateString()}
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
					)}
				</S.Body>
				<Banner />
			</S.Content>
		</Container>
	)
}

export default Expenses
