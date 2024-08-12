import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	background-color: ${props => props.theme.background};
`
export const Content = styled.View`
	align-items: center;
	padding: 12px;
	gap: 12px;
`
export const Percentage = styled(Font)`
	color: ${props => props.theme.foreground};
	font-size: 18px;
`
export const Description = styled(Font)`
	margin-top: 16px;
	color: ${props => props.theme.foreground};
	font-size: 14px;
	opacity: 0.7;
`
