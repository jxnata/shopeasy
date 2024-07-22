import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { Button, Container, Label } from '../../theme/global'

function Auth({ navigation }: Props) {
	const [validation, setValidation] = useState(false)
	const [email, setEmail] = useState('')
	const { t } = useTranslation('translation', { keyPrefix: 'auth' })
	const { login, verify } = useSession()

	const auth = async () => {
		try {
			await login(email)
			setValidation(true)
		} catch (err) {
			console.log(err)
			toast.error(t('auth_failed'))
		}
	}
	const handleDeepLink = useCallback(
		async (event: { url: string }) => {
			const url = event.url
			if (!url) return

			const paramList = url.split('?')[1]
			if (!paramList) return

			const params = new URLSearchParams(paramList)

			const userId = params.get('userId')
			const secret = params.get('secret')
			const expire = params.get('expire')

			if (!userId || !secret || !expire) return toast.error(t('auth_failed'))

			if (new Date(expire) < new Date()) return toast.error(t('auth_expired'))

			await verify(userId, secret)
		},
		[t, verify]
	)

	useEffect(() => {
		Linking.addEventListener('url', handleDeepLink)
	}, [handleDeepLink])

	useEffect(() => {
		const checkUrl = async () => {
			const url = await Linking.getInitialURL()
			if (url) handleDeepLink({ url })
		}

		checkUrl()
	}, [handleDeepLink])

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Head>
						<S.Logo resizeMode='contain' />
						<S.Description>{t('description')}</S.Description>
						<S.EmojiList>🛒🍎🍍🥩🍊🍔🥦✅</S.EmojiList>
					</S.Head>
					{!validation && (
						<S.Body>
							<Input
								label={t('email_label')}
								keyboardType='email-address'
								inputMode='email'
								autoCapitalize='none'
								autoCorrect={false}
								autoComplete='email'
								onChangeText={setEmail}
								placeholder={t('email_placeholder')}
								returnKeyType='done'
							/>
							<Button onPress={auth}>
								<Label>{t('auth_button')}</Label>
							</Button>
						</S.Body>
					)}
					{validation && (
						<S.Body>
							<Label>{t('check_email')}</Label>
						</S.Body>
					)}
				</S.Content>
			</S.SafeAreaView>
		</Container>
	)
}

export default Auth
