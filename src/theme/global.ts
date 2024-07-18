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
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`
export const Label = styled(Font)`
	font-size: 16px;
	font-weight: 800;
`