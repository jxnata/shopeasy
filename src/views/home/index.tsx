import React from 'react'

import { useTranslation } from 'react-i18next'
import { Container, Label } from '../../theme/global'
import * as S from './styles'
import { Props } from './types'
import { avatar } from '../../utils/avatar'
import { useLists } from '../../hooks/lists'
import ListItem from '../../components/list-item'
import { RefreshControl } from 'react-native'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { lists, loading, mutate } = useLists()

	return (
		<Container>
			<S.Content>
				<S.Header>
					<S.Title>{t('title')}</S.Title>
					<S.Avatar source={{ uri: avatar('shopeasy') }} />
				</S.Header>
				<S.Body>
					{lists.length ? (
						<S.Empty>
							<S.Text>{t('no_lists')}</S.Text>
							<S.CreateButton>
								<Label>{t('create_button')}</Label>
							</S.CreateButton>
						</S.Empty>
					) : (
						<S.ListContainer refreshControl={<RefreshControl refreshing={loading} onRefresh={mutate} />}>
							{lists.map((item: any) => (
								<ListItem item={item} />
							))}
						</S.ListContainer>
					)}
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Home
