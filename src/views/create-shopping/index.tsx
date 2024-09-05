import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Input from '../../components/input'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { createShopping } from '../../database/models/shoppings'
import { Button, ButtonLabel, Container } from '../../theme/global'
import { Shopping, ShoppingData } from '../../types/models/shopping'

function CreateShopping({ navigation, route }: Props) {
	const { list } = route.params
	const items = list ? list.items : []
	const { t } = useTranslation('translation', { keyPrefix: 'create-shopping' })

	const { current } = useSession()
	const currentId = useMemo(() => (current ? current.$id : undefined), [current])
	const { control, handleSubmit } = useForm<Partial<Shopping>>()

	const onSave = async (form: Partial<ShoppingData>) => {
		if (!currentId || !form.local) return

		try {
			const data: ShoppingData = {
				list_id: list.id,
				local: form.local,
				finished: false,
				items,
				total: 0,
			}

			const created = createShopping(data)

			navigation.replace('shopping', { shopping: created })
		} catch {
			toast.error(t('create_error'))
		}
	}

	return (
		<Container>
			<S.Content>
				<S.Body>
					<Header title={t('title')} />
					<Controller
						control={control}
						rules={{ required: true }}
						name='local'
						render={({ field: { onChange, value } }) => (
							<Input
								label={t('shopping_local')}
								value={value}
								onChangeText={onChange}
								placeholder={t('shopping_local_placeholder')}
								maxLength={32}
								autoFocus
							/>
						)}
					/>

					<Button onPress={handleSubmit(onSave)}>
						<ButtonLabel>{t('create_button')}</ButtonLabel>
					</Button>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default CreateShopping
