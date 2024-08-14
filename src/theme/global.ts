import styled from 'styled-components/native'

import Icon from '../components/icon'

export const Container = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Font = styled.Text`
	font-family: 'Nunito';
	color: ${props => props.theme.foreground};
	font-size: 16px;
`
export const Button = styled.TouchableOpacity`
	background-color: ${props => props.theme.primary};
	height: 48px;
	padding: 0 16px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 4px;
`
export const Label = styled(Font)`
	font-size: 16px;
	font-weight: 800;
`
export const ButtonLabel = styled(Label)`
	color: ${props => props.theme.secondary};
`
export const ButtonIcon = styled(Icon)`
	font-family: 'Ionicons';
	color: ${props => props.theme.secondary};
`
