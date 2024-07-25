import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	padding: 12px;
	background-color: ${props => props.theme.background};
`
export const Font = styled.Text`
	font-family: 'Nunito';
	color: ${props => props.theme.foreground};
	font-size: 16px;
`
export const Button = styled.TouchableOpacity`
	background-color: ${props => props.theme.primary};
	width: 100%;
	height: 56px;
	padding: 4px 16px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	border-bottom-width: 3px;
	border-bottom-color: ${props => props.theme.focus};
	flex-direction: row;
	gap: 4px;
`
export const Label = styled(Font)`
	font-size: 16px;
	font-weight: 800;
`
