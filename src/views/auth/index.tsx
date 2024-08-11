import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { Container, Label } from '../../theme/global'

function Auth({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'auth' })
	const { appleAuthentication, googleAuthentication, loading } = useSession()

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
			return

			toast.error(t('auth_unauthorized'))
		} catch {
			toast.error(t('auth_failed'))
		}
	}, [googleAuthentication, t])

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Head>
						<S.Logo resizeMode='contain' />
						<S.Description>{t('description')}</S.Description>
						<S.EmojiList>🛒🍎🍍🥩🍊🍔🥦✅</S.EmojiList>
					</S.Head>
					<S.Body>
						<Label>{t('apple_id_auth')}</Label>
						{Platform.OS === 'ios' && (
							<AppleButton
								buttonStyle={AppleButton.Style.WHITE}
								buttonType={AppleButton.Type.SIGN_IN}
								style={{ width: '100%', height: 48 }}
								onPress={appleSign}
							/>
						)}
						{Platform.OS === 'android' && (
							<GoogleSigninButton
								size={GoogleSigninButton.Size.Wide}
								color={GoogleSigninButton.Color.Light}
								onPress={googleSign}
								disabled={loading}
							/>
						)}
					</S.Body>
				</S.Content>
			</S.SafeAreaView>
		</Container>
	)
}

export default Auth
