import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { Container, Label } from '../../theme/global'

function Auth({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'auth' })
	const { login } = useSession()

	const appleSign = useCallback(async () => {
		try {
			const appleAuthRequestResponse = await appleAuth.performRequest({
				requestedOperation: appleAuth.Operation.LOGIN,
				requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
			})

			const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

			if (credentialState === appleAuth.State.AUTHORIZED) {
				await login(appleAuthRequestResponse)
				return
			}

			toast.error(t('auth_unauthorized'))
		} catch {
			toast.error(t('auth_failed'))
		}
	}, [login, t])

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
						<AppleButton
							buttonStyle={AppleButton.Style.WHITE}
							buttonType={AppleButton.Type.SIGN_IN}
							style={{
								width: '100%',
								height: 48,
							}}
							onPress={appleSign}
						/>
					</S.Body>
				</S.Content>
			</S.SafeAreaView>
		</Container>
	)
}

export default Auth
