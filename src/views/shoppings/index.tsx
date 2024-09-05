import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import ShoppingRow from '../../components/shopping-row'
import { useShoppings } from '../../hooks/local/useShoppings'
import { Container } from '../../theme/global'

function Shoppings({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'shoppings' })

	const { shoppings } = useShoppings()

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header title={t('title')} />
					<FlatList
						data={shoppings}
						keyExtractor={item => item.id}
						renderItem={({ item }) => <ShoppingRow item={item} />}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
						ListEmptyComponent={
							<S.Empty>
								<S.Text>{t('no_lists')}</S.Text>
							</S.Empty>
						}
					/>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Shoppings
