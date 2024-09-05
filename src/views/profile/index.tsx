import React from 'react'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Banner from '../../components/banner'
// import Icon from '../../components/icon'
import Loading from '../../components/loading'
import { useSession } from '../../contexts/session'
import { useSettings } from '../../contexts/settings'
import { Container, Label } from '../../theme/global'
// import { AppColor } from '../../types/all/colors'
import { avatar } from '../../utils/avatar'
import { getTheme } from '../../utils/get-theme'

// const colors: AppColor[] = ['green', 'blue', 'orange', 'red', 'pink', 'purple', 'mono']

function Profile({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'profile' })
	const { current, premium, logout } = useSession()
	const { color } = useSettings()
	const mode = useColorScheme()
	const appTheme = getTheme(mode, color)

	if (!current) return <Loading />

	const navigateToSubscribe = () => navigation.navigate('subscribe')

	// const selectColor = (c: AppColor) => {
	// 	setColor(c)
	// }

	return (
		<Container>
			<S.Content>
				<S.Body>
					<S.Avatar source={{ uri: avatar(current.$id, appTheme.primary) }} />
					<Banner />
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
						{/* <S.InfoRow>
							<S.InfoLabel>{t('color')}</S.InfoLabel>
							<S.ColorContainer>
								{colors.map(c => (
									<S.Color
										key={c}
										aria-label={c}
										onPress={() => selectColor(c)}
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										style={{
											backgroundColor: getTheme(mode, c).primary,
											borderColor: getTheme(mode, c).secondary,
										}}
									>
										{c === color && <Icon name='checkmark' color={getTheme(mode, c).secondary} />}
									</S.Color>
								))}
							</S.ColorContainer>
						</S.InfoRow> */}
						{!premium && (
							<S.PremiumButton onPress={navigateToSubscribe}>
								<S.PremiumIcon name='diamond' />
								<S.ButtonLabel>{t('premium_button')}</S.ButtonLabel>
							</S.PremiumButton>
						)}
						<S.LogoutButton onPress={logout}>
							<S.InfoLabel>{t('logout_button')}</S.InfoLabel>
						</S.LogoutButton>
					</S.InfoContainer>
				</S.Body>
				<S.CloseButton onPress={() => navigation.goBack()}>
					<Label>✕</Label>
				</S.CloseButton>
			</S.Content>
		</Container>
	)
}

export default Profile
