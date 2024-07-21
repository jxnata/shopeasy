import React from 'react'

import { useTranslation } from 'react-i18next'
import { Button, Container, Label } from '../../theme/global'
import * as S from './styles'
import { Props } from './types'
import { settings } from '../../database'

function Intro({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'intro' })

	const onClose = () => {
		settings.set('initialized', true)
	}

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Body>
						<S.Head>
							<S.Logo resizeMode='contain' />
							<S.EmojiList>🛒🍎🍍🥩🍊🍔🥦✅</S.EmojiList>
						</S.Head>

						<S.Description>{t('description')}</S.Description>

						<S.FeatureList>
							<S.Title>{t('premium_features_title')}</S.Title>
							<S.FeatureText>{t('feature1')}</S.FeatureText>
							<S.FeatureText>{t('feature2')}</S.FeatureText>
							<S.FeatureText>{t('feature3')}</S.FeatureText>
							<S.FeatureText>{t('feature4')}</S.FeatureText>
							<S.FeatureText>{t('feature5')}</S.FeatureText>
						</S.FeatureList>
					</S.Body>

					<S.CloseButton onPress={onClose}>
						<Label>✕</Label>
					</S.CloseButton>
					<Button>{<Label>{t('subscribe_button')}</Label>}</Button>
				</S.Content>
			</S.SafeAreaView>
		</Container>
	)
}

export default Intro
