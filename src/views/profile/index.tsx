import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native'
import { getLocales } from 'react-native-localize'

import * as S from './styles'
import { Props } from './types'
import Banner from '../../components/banner'
import Header from '../../components/header'
import Icon from '../../components/icon'
import { useSession } from '../../contexts/session'
import { useSettings } from '../../contexts/settings'
import { Container } from '../../theme/global'
import { AppColor } from '../../types/all/colors'
import { getCurrency } from '../../utils/get-currency'
import { getTheme } from '../../utils/get-theme'

const colors: AppColor[] = ['green', 'blue', 'orange', 'red', 'pink', 'purple', 'mono']

function Profile({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'profile' })
	const { premium } = useSession()
	const { color, setColor } = useSettings()
	const mode = useColorScheme()

	const currency = useMemo(() => getCurrency(), [])
	const { languageTag } = getLocales()[0]

	const navigateToSubscribe = () => navigation.navigate('subscribe')

	const selectColor = (c: AppColor) => {
		setColor(c)
	}

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header title={t('title')} />
					<Banner />
					<S.InfoContainer>
						<S.InfoRow>
							<S.InfoLabel>{t('language')}</S.InfoLabel>
							<S.InfoValue>{languageTag}</S.InfoValue>
						</S.InfoRow>
						<S.InfoRow>
							<S.InfoLabel>{t('currency')}</S.InfoLabel>
							<S.InfoValue>{currency}</S.InfoValue>
						</S.InfoRow>
						<S.InfoRow>
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
						</S.InfoRow>
						{!premium && (
							<S.PremiumButton onPress={navigateToSubscribe}>
								<S.PremiumIcon name='diamond' />
								<S.ButtonLabel>{t('premium_button')}</S.ButtonLabel>
							</S.PremiumButton>
						)}
					</S.InfoContainer>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Profile
