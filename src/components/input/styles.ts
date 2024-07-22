import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

interface StyledInputProps extends TextInputProps {
	label?: string
	Right?: JSX.Element
}

export const Container = styled.View`
	align-items: flex-start;
`
export const LabelContainer = styled.View`
	margin-bottom: 4px;
`
export const Label = styled(Font)`
	font-size: 12px;
	font-weight: bold;
	margin-bottom: 4px;
`
export const RightContainer = styled.View`
	position: absolute;
	right: 0px;
	bottom: 5px;
`
export const Input = styled.TextInput.attrs<StyledInputProps>(({ theme }) => ({
	placeholderTextColor: theme.base,
}))`
	width: 100%;
	height: 50px;
	padding: 0 16px;
	padding-right: ${props => (props.Right ? '32px' : '16px')};
	margin-bottom: 4px;
	border-radius: 12px;
	border: solid 2px ${props => (props['aria-selected'] ? props.theme.foreground : props.theme.base)};
	background: ${props => props.theme.background};
	color: ${props => props.theme.foreground};
	font-size: 16px;
	font-family: 'Nunito';
`
