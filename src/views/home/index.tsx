import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import ListItem from '../../components/list-item'
import { useSession } from '../../contexts/session'
import { useLists } from '../../hooks/lists'
import { getUserQuery } from '../../lib/appwrite/queries/user-query'
import { ButtonIcon, ButtonLabel, Container } from '../../theme/global'
import { List } from '../../types/models/list'
import { avatar } from '../../utils/avatar'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { current } = useSession()

	const disabled = !current
	const queries = getUserQuery(current ? current.$id : undefined)

	const { lists, loading, mutate } = useLists(queries, disabled)

	const onCreate = async () => {
		navigation.navigate('list')
	}

	const onOpenList = async (list: List) => {
		navigation.navigate('list', { list })
	}

	useLayoutEffect(() => {
		mutate()
	}, [mutate])

	return (
		<Container>
			<S.Content>
				<S.Header>
					<S.Title>{t('title')}</S.Title>
					<S.Avatar source={{ uri: avatar('shopeasy') }} />
				</S.Header>
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
					{lists.length > 0 && (
						<S.AddButton onPress={onCreate}>
							<ButtonIcon name='add-circle' />
							<ButtonLabel>{t('add_list_button')}</ButtonLabel>
						</S.AddButton>
					)}
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Home
