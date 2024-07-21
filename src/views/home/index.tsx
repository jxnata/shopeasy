import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import ListItem from '../../components/list-item'
import { useLists } from '../../hooks/lists'
import { Container, Label } from '../../theme/global'
import { avatar } from '../../utils/avatar'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { lists, loading, mutate } = useLists()

	const onCreate = () => {
		navigation.navigate('create')
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
						keyExtractor={item => item.hash}
						refreshControl={<RefreshControl onRefresh={mutate} refreshing={loading} />}
						renderItem={({ item }) => <ListItem item={item} />}
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
