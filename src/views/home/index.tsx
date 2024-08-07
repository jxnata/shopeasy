import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Banner from '../../components/banner'
import ListItem from '../../components/list-item'
import MenuItem from '../../components/menu-item'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useDocuments } from '../../hooks/documents'
import { databases, queries } from '../../lib/appwrite'
import { ButtonIcon, ButtonLabel, Container } from '../../theme/global'
import { List } from '../../types/models/list'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { current } = useSession()
	const currentId = current ? current.$id : undefined

	const {
		data: lists,
		loading,
		mutate,
	} = useDocuments<List[]>({
		queryKey: ['lists', currentId],
		initialData: [],
		enabled: !!currentId,
		queryFn: async () => await databases.listDocuments(DB, MODELS.LIST, queries.listsByUser(currentId)),
	})

	const onCreate = () => navigation.navigate('list')

	const navigateToShoppings = () => navigation.navigate('shoppings')

	const onOpenList = async (list: List) => navigation.navigate('list', { list })

	const navigateToSubscribe = () => navigation.navigate('subscribe')

	const navigateToProfile = () => navigation.navigate('profile')

	return (
		<Container>
			<S.Content>
				<S.Body>
					<FlatList
						data={lists}
						keyExtractor={item => item.$id}
						refreshControl={<RefreshControl onRefresh={mutate} refreshing={loading} />}
						renderItem={({ item }) => <ListItem item={item} user={current!} onPress={onOpenList} />}
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
				<S.MenuContainer>
					<Banner />
					<S.MenuList
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 12 }}
					>
						<MenuItem title={t('menu_item_create')} icon='✏️' action={onCreate} />
						<MenuItem title={t('menu_item_shop')} icon='🛍️' action={navigateToShoppings} />
						<MenuItem title={t('menu_item_expenses')} icon='💸' action={() => {}} />
						<MenuItem title={t('menu_item_profile')} icon='🙋' action={navigateToProfile} />
						<MenuItem title={t('menu_item_premium')} icon='👑' action={navigateToSubscribe} />
					</S.MenuList>
				</S.MenuContainer>
			</S.Content>
		</Container>
	)
}

export default Home
