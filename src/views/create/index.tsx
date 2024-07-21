import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Icon from '../../components/icon'
import Input from '../../components/input'
import Item from '../../components/item'
import { Container, Label } from '../../theme/global'

function Create({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'create' })
	const [marketItems, setMarketItems] = useState<any[]>([])
	const [name, setName] = useState<string>('')

	const items = useMemo(() => marketItems.map(i => i.name), [marketItems])

	const setItems = (items: string[]) => {
		setMarketItems(items.map(i => ({ name: i, qty: 1, price: 0 })))
	}

	const onAdd = () => {
		if (!name) return
		navigation.navigate('add', { items, setItems })
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
						autoFocus={items.length === 0}
					/>
					<S.AddButton onPress={onAdd}>
						<Icon name='add-circle' />
						<Label>{t('add_items')}</Label>
					</S.AddButton>
					<FlatList
						data={marketItems}
						keyExtractor={(_, i) => i.toString()}
						renderItem={({ item }) => <Item item={item} />}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
					/>
					<S.SaveButton disabled={!name}>
						<Label>{t('create_button')}</Label>
					</S.SaveButton>
				</S.Body>
			</S.Content>
		</Container>
	)
}

export default Create
