import { ID, Query } from 'appwrite'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import Input from '../../components/input'
import ItemRow from '../../components/item'
import { toast } from '../../components/toast'
import { DB, MODELS } from '../../constants'
import { useSession } from '../../contexts/session'
import { useItems } from '../../hooks/items'
import { databases } from '../../lib/appwrite'
import { Container, Label } from '../../theme/global'
import { List } from '../../types/models/list'
import { getPermissions } from '../../utils/getPermissions'

function Create({ navigation, route }: Props) {
	const listParam = route.params ? route.params.list : undefined

	const { current } = useSession()
	const { t } = useTranslation('translation', { keyPrefix: 'create' })
	const [name, setName] = useState<string>('')
	const [list, setList] = useState<List | undefined>(listParam)

	const queries = [
		Query.select(['$id', 'name', 'category', 'price', 'unit', 'qty']),
		Query.equal('list', [list ? list.$id : 'awaiting']),
	]

	const { items, mutate } = useItems(queries)

	const itemsList = useMemo(() => items.map(i => i.name), [items])

	const onAdd = () => {
		if (!list) return
		navigation.navigate('add', { items: itemsList, listId: list.$id, queries })
	}

	const onSave = async () => {
		if (!current || !name) return

		try {
			const created: List = await databases.createDocument(
				DB,
				MODELS.LISTS,
				ID.unique(),
				{ name },
				getPermissions(current.$id)
			)
			setList(created)
		} catch {
			toast.error(t('create_error'))
		}
	}

	return (
		<Container>
			<S.Content>
				<S.Header>
					<S.Title>{list ? list.name : t('title')}</S.Title>
				</S.Header>
				<S.Body>
					{!list && (
						<Input
							value={name}
							onChangeText={setName}
							placeholder={t('list_name')}
							maxLength={32}
							autoFocus={items.length === 0}
							onSubmitEditing={onSave}
							returnKeyType='done'
						/>
					)}
					{list && (
						<S.AddButton onPress={onAdd}>
							<Icon name='add-circle' />
							<Label>{t('add_items')}</Label>
						</S.AddButton>
					)}
					<FlatList
						data={items}
						keyExtractor={item => item.$id}
						renderItem={({ item }) => <ItemRow item={item} mutate={mutate} />}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
					/>
					{!list && (
						<S.SaveButton disabled={!name}>
							<Label>{t('create_button')}</Label>
						</S.SaveButton>
					)}
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Create
