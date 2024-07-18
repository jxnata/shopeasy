import styled from 'styled-components/native'
import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.background};
	padding: 10px;
`
export const Text = styled(Font)`
	font-size: 18px;
`