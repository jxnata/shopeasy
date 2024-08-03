import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { databases } from '../../lib/appwrite'
import { Button, ButtonIcon, ButtonLabel, Container } from '../../theme/global'
import { getPermissions } from '../../utils/get-permissions'

function ListRename({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined

	const { current } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'rename' })
	const [name, setName] = useState<string>(listParam ? listParam.name : '')

	const queryClient = useQueryClient()

	const onSave = async () => {
		if (!current || !name || !listParam) return

		try {
			await databases.updateDocument(
				DB,
				MODELS.LIST,
				listParam.$id,
				{
					name,
					user: current.$id,
				},
				getPermissions(current.$id)
			)

			queryClient.invalidateQueries({ queryKey: ['list', listParam.$id] })

			navigation.goBack()
		} catch {
			toast.error(t('edit_error'))
		}
	}

	return (
		<Container>
			<S.Content>
				<S.Header>
					<S.Title>{t('title')}</S.Title>
				</S.Header>
				<S.Body>
					<Input
						value={name}
						onChangeText={setName}
						placeholder={t('list_name')}
						maxLength={32}
						autoFocus
						onSubmitEditing={onSave}
						returnKeyType='done'
					/>
					<Button disabled={!name} onPress={onSave}>
						<ButtonIcon name='checkmark-circle' />
						<ButtonLabel>{t('edit_button')}</ButtonLabel>
					</Button>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default ListRename
