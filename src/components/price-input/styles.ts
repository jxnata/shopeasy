import { MaskedTextInput, MaskedTextInputProps } from 'react-native-mask-text'
import styled from 'styled-components/native'

interface StyledInputProps extends MaskedTextInputProps {
	label?: string
	Right?: JSX.Element
}

export const Input = styled(MaskedTextInput).attrs<StyledInputProps>(({ theme }) => ({
	placeholderTextColor: theme.base,
}))`
	height: 32px;
	padding: 0 8px;
	border-radius: 8px;
	border: solid 2px ${props => (props['aria-selected'] ? props.theme.foreground : props.theme.base)};
	background: ${props => props.theme.background};
	color: ${props => props.theme.foreground};
	font-size: 14px;
	font-family: 'Nunito';
`
