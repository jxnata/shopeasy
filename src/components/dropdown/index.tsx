import React, { useMemo, useState } from 'react'
import { Modal } from 'react-native'

import * as S from './styles'
import Icon from '../icon'

const Dropdown = ({ selectedValue, options, label, placeholder, onValueChange }: Props) => {
	const [open, setOpen] = useState(false)

	const toggle = () => {
		setOpen(old => !old)
	}

	const onPress = (item: { value: string; label: string }) => {
		onValueChange(item.value)
		setTimeout(toggle, 100)
	}

	const selectedLabel = useMemo(() => {
		if (!selectedValue) return
		if (!options) return
		if (!options.length) return

		const selected = options.find(o => o.value === selectedValue)

		if (!selected) return

		return selected.label
	}, [selectedValue, options])

	return (
		<S.DropdowContainer>
			{!!label && <S.Label>{label}</S.Label>}
			<S.Input onPress={toggle}>
				<S.Placeholder>{selectedLabel || placeholder}</S.Placeholder>
				<Icon name='chevron-down' />
			</S.Input>
			<Modal animationType='fade' transparent visible={open} onRequestClose={toggle}>
				<S.Container onPress={toggle}>
					<S.Content>
						<S.List
							data={options}
							renderItem={({ item }) => (
								<S.Item onPress={() => onPress(item)}>
									{item.value === selectedValue ? (
										<Icon name='checkmark-circle' />
									) : (
										<Icon name='ellipse-outline' />
									)}
									<S.Label>{item.label}</S.Label>
								</S.Item>
							)}
							keyExtractor={item => item.label}
							ListFooterComponent={<S.Space />}
						/>
					</S.Content>
				</S.Container>
			</Modal>
		</S.DropdowContainer>
	)
}

export default Dropdown

type Props = {
	selectedValue: string
	options: { label: string; value: string }[]
	placeholder: string
	label?: string
	onValueChange: (value: string) => void
}
