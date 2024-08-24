import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Icon from '../../components/icon'
import ListRow from '../../components/list-row'
import { useSession } from '../../contexts/session'
import { createShoppingList } from '../../database/models/lists'
import { useShoppingLists } from '../../hooks/local/useShoppingLists'
import { ButtonIcon, ButtonLabel, Container } from '../../theme/global'
import { ShoppingList } from '../../types/models/shopping-list'
import { showInterstitial } from '../../utils/show-interstitial'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { current, premium } = useSession()

	const { lists } = useShoppingLists()

	const onCreate = () => navigation.navigate('create')

	const onCopy = useCallback(
		(list: ShoppingList) => {
			const data = {
				name: list.name,
				shopping: false,
				finished: false,
				items: list.items.map(i => ({ ...i, checked: false })),
				total: 0,
			}

			const newList = createShoppingList(data)

			if (!premium) showInterstitial()

			navigation.navigate('list', { list: newList })
		},
		[navigation, premium]
	)

	const onConfirmCopy = useCallback(
		(list: ShoppingList) => {
			Alert.alert(t('copy_title'), t('copy_text'), [
				{
					text: t('cancel'),
					style: 'cancel',
				},
				{
					text: t('copy_confirm'),
					onPress: () => onCopy(list),
					style: 'default',
				},
			])
		},
		[onCopy, t]
	)

	const onOpenList = async (list: ShoppingList) => navigation.navigate('list', { list })

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header
						title={t('title')}
						Right={() => (
							<S.HeaderButton onPress={onCreate}>
								<Icon name='add-circle' size={24} />
							</S.HeaderButton>
						)}
					/>
					<FlatList
						data={lists}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<ListRow item={item} user={current!} onPress={onOpenList} onCopy={onConfirmCopy} />
						)}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
						ListEmptyComponent={
							<S.Empty>
								<S.Text>{t('no_lists')}</S.Text>
								<S.CreateButton onPress={onCreate}>
									<ButtonIcon name='add-circle' />
									<ButtonLabel>{t('create_button')}</ButtonLabel>
								</S.CreateButton>
							</S.Empty>
						}
					/>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Home
