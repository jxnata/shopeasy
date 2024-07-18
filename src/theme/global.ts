import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	padding: 10px;
	background-color: ${props => props.theme.background};
`
export const Font = styled.Text`
	font-family: 'Source Code Pro';
	color: ${props => props.theme.foreground};
`
export const Button = styled.TouchableOpacity`
	background-color: ${props => props.theme.primary};
    width: 100%;
    height: 50px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`