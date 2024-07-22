import React, { forwardRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import * as S from './styles'

interface InputProps extends TextInputProps {
	label?: string
	Right?: JSX.Element
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
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

export default Input
