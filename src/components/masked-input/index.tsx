import React, { forwardRef, useState } from 'react'
import { TextInput } from 'react-native'
import { MaskedTextInputProps } from 'react-native-mask-text'

import * as S from './styles'

interface InputProps extends MaskedTextInputProps {
	label?: string
	Right?: JSX.Element
}

const MaskedInput = forwardRef<TextInput, InputProps>((props, ref) => {
	const [isFocused, setIsFocused] = useState(false)

	return (
		<S.Container>
			{!!props.label && <S.Label>{props.label}</S.Label>}
			<S.Input
				ref={ref}
				{...props}
				aria-selected={isFocused}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{!!props.Right && <S.RightContainer>{props.Right}</S.RightContainer>}
		</S.Container>
	)
})

export default MaskedInput
