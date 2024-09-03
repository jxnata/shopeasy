import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Icon from '../../components/icon'
import ListRow from '../../components/list-row'
import TabMenu from '../../components/shared/tab-menu'
import { useShoppingLists } from '../../hooks/local/useShoppingLists'
import { ButtonIcon, ButtonLabel, Container } from '../../theme/global'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })

	const { lists } = useShoppingLists()

	const onCreate = () => navigation.navigate('create')

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
						renderItem={({ item }) => <ListRow item={item} />}
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
				<TabMenu
					items={[
						{
							title: t('title'),
							icon: 'bag-handle',
							route: 'home',
						},
						{
							title: t('profile'),
							icon: 'person',
							route: 'profile',
						},
						{
							title: t('premium'),
							icon: 'diamond',
							route: 'subscribe',
						},
					]}
					current='home'
				/>
			</S.Content>
		</Container>
	)
}

export default Home
