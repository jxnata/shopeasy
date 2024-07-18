import React from 'react'

import { useTranslation } from 'react-i18next'
import { Container } from '../../theme/global'
import * as S from './styles'
import { Props } from './types'

function Intro({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'intro' })

	return (
		<Container>
			<S.Content>
				<S.Text>{t('welcome')}</S.Text>
			</S.Content>
		</Container>
	)
}

export default Intro
