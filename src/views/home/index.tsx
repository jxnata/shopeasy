import { Query } from 'appwrite'
import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import ListItem from '../../components/list-item'
import { useSession } from '../../contexts/session'
import { useLists } from '../../hooks/lists'
import { Container, Label } from '../../theme/global'
import { List } from '../../types/models/list'
import { avatar } from '../../utils/avatar'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { current } = useSession()

	const disabled = !current
	const queries = [
		Query.select(['$id', 'name', 'user', '$createdAt']),
		Query.equal('user', [current ? current.$id : 'awaiting']),
	]

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
									<Icon name='add-circle' />
									<Label>{t('create_button')}</Label>
								</S.CreateButton>
							</S.Empty>
						}
					/>
					{lists.length > 0 && (
						<S.AddButton onPress={onCreate}>
							<Icon name='add-circle' />
							<Label>{t('add_list_button')}</Label>
						</S.AddButton>
					)}
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Home
