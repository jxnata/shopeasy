import { Query } from 'appwrite'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import ListItem from '../../components/list-item'
import { useLists } from '../../hooks/lists'
import { Container, Label } from '../../theme/global'
import { List } from '../../types/models/list'
import { avatar } from '../../utils/avatar'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { lists, loading, mutate } = useLists([Query.select(['$id', 'name', 'count'])])

	const onCreate = async () => {
		navigation.navigate('create')
	}

	const onOpenList = async (list: List) => {
		navigation.navigate('create', { list })
	}

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
						renderItem={({ item }) => <ListItem item={item} onPress={onOpenList} />}
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
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Home
