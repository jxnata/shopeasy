import React, { useCallback, useState } from 'react'

import * as S from './styles'

type CheckboxComponentProps = {
	onChange?: () => void
}

const useCheckbox = (options: string[], initialSelected?: string[], unique?: boolean) => {
	const [selectedValues, setSelectedValues] = useState(initialSelected || [])

	const isSelected = useCallback(
		(option: string) => {
			return selectedValues.includes(option)
		},
		[selectedValues]
	)

	const onChangeSelected = useCallback(
		(value: string, callback?: (value: string | string[]) => void) => {
			if (unique) {
				setSelectedValues([value])
				if (callback) callback(value)
				return
			}

			if (selectedValues.includes(value)) {
				const values = selectedValues.filter(selected => selected !== value)
				setSelectedValues(values)
				if (callback) callback(values)
			} else {
				setSelectedValues([...selectedValues, value])
				if (callback) callback([...selectedValues, value])
			}
		},
		[selectedValues, unique]
	)

	const CheckboxComponent = useCallback(
		({ onChange }: CheckboxComponentProps) => {
			return (
				<S.Container>
					{options.map(option => (
						<S.Button
							key={option}
							aria-selected={isSelected(option)}
							onPress={() => {
								onChangeSelected(option, onChange)
							}}
						>
							<S.ButtonText aria-selected={isSelected(option)}>{option}</S.ButtonText>
						</S.Button>
					))}
				</S.Container>
			)
		},
		[options, isSelected, onChangeSelected]
	)

	return { CheckboxComponent, selectedValues }
}

export default useCheckbox
