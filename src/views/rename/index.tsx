import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useViewList } from '../../hooks/lists/view'
import { databases } from '../../lib/appwrite'
import { Button, ButtonIcon, ButtonLabel, Container } from '../../theme/global'
import { getPermissions } from '../../utils/get-permissions'

function ListRename({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined

	const { current } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'rename' })
	const { mutate } = useViewList(listParam ? listParam.$id : undefined)
	const [name, setName] = useState<string>(listParam ? listParam.name : '')

	const onSave = async () => {
		if (!current || !name || !listParam) return

		try {
			await databases.updateDocument(
				DB,
				MODELS.LISTS,
				listParam.$id,
				{
					name,
					user: current.$id,
				},
				getPermissions(current.$id)
			)
			mutate()
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
