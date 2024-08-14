import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, useColorScheme } from 'react-native'
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

import * as S from './styles'
import { Props } from './types'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { Container } from '../../theme/global'

function Auth({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'auth' })
	const { appleAuthentication, googleAuthentication, loading } = useSession()
	const scheme = useColorScheme()

	const buttonTranslateY = useSharedValue(100)
	const buttonStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: buttonTranslateY.value }],
	}))
	const logoOpacity = useSharedValue(0)
	const logoStyle = useAnimatedStyle(() => ({
		opacity: logoOpacity.value,
	}))

	const appleSign = useCallback(async () => {
		try {
			const appleAuthRequestResponse = await appleAuth.performRequest({
				requestedOperation: appleAuth.Operation.LOGIN,
				requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
			})

			const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

			if (credentialState === appleAuth.State.AUTHORIZED) {
				await appleAuthentication(appleAuthRequestResponse)
				return
			}

			toast.error(t('auth_unauthorized'))
		} catch {
			toast.error(t('auth_failed'))
		}
	}, [appleAuthentication, t])

	const googleSign = useCallback(async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()

			await googleAuthentication(userInfo)
		} catch {
			toast.error(t('auth_failed'))
		}
	}, [googleAuthentication, t])

	useEffect(() => {
		logoOpacity.value = withTiming(1, { duration: 1000 })
		buttonTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 })
	}, [buttonTranslateY, logoOpacity])

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Body style={buttonStyle}>
						<S.Description>{t('description')}</S.Description>
						{Platform.OS === 'ios' && (
							<AppleButton
								buttonStyle={scheme === 'dark' ? AppleButton.Style.WHITE : AppleButton.Style.BLACK}
								buttonType={AppleButton.Type.SIGN_IN}
								style={{ width: '100%', height: 48 }}
								onPress={appleSign}
							/>
						)}
						{Platform.OS === 'android' && (
							<GoogleSigninButton
								size={GoogleSigninButton.Size.Wide}
								color={
									scheme === 'dark' ? GoogleSigninButton.Color.Light : GoogleSigninButton.Color.Dark
								}
								onPress={googleSign}
								disabled={loading}
							/>
						)}
					</S.Body>
				</S.Content>
			</S.SafeAreaView>
			<S.LogoContainer style={logoStyle}>
				<S.Logo resizeMode='contain' />
			</S.LogoContainer>
		</Container>
	)
}

export default Auth
