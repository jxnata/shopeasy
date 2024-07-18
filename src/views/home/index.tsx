import React from 'react'

import { useTranslation } from 'react-i18next'
import { Container } from '../../theme/global'
import * as S from './styles'
import { Props } from './types'

function Home({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'home' })

	return (
		<Container>
			<S.Content>
				<S.Text>{t('hello')}</S.Text>
			</S.Content>
		</Container>
	)
}

export default Home
