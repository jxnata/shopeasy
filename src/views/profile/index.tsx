import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import Banner from '../../components/banner'
import Loading from '../../components/loading'
import { useSession } from '../../contexts/session'
import { ButtonIcon, Container } from '../../theme/global'
import { avatar } from '../../utils/avatar'

function Profile({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'profile' })
	const { current, premium, logout } = useSession()

	if (!current) return <Loading />

	const navigateToSubscribe = () => navigation.navigate('subscribe')
	return (
		<Container>
			<S.Content>
				<S.Body>
					<S.Avatar source={{ uri: avatar(current.$id) }} />
					<S.InfoContainer>
						<S.InfoRow>
							<S.InfoLabel>{t('name')}</S.InfoLabel>
							<S.InfoValue>{current.name}</S.InfoValue>
						</S.InfoRow>
						<S.InfoRow>
							<S.InfoLabel>{t('email')}</S.InfoLabel>
							<S.InfoValue>{current.email}</S.InfoValue>
						</S.InfoRow>
						<S.InfoRow>
							<S.InfoLabel>{t('created_at')}</S.InfoLabel>
							<S.InfoValue>{new Date(current.$createdAt).toLocaleDateString()}</S.InfoValue>
						</S.InfoRow>
						{!premium && (
							<S.PremiumButton onPress={navigateToSubscribe}>
								<ButtonIcon name='diamond' />
								<S.InfoLabel>{t('premium_button')}</S.InfoLabel>
							</S.PremiumButton>
						)}
						<S.LogoutButton onPress={logout}>
							<S.InfoLabel>{t('logout_button')}</S.InfoLabel>
						</S.LogoutButton>
					</S.InfoContainer>
				</S.Body>
				<Banner />
			</S.Content>
		</Container>
	)
}

export default Profile
