import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Container = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Content = styled.View`
	padding: 12px 8px;
	gap: 12px;
`
export const Item = styled.TouchableOpacity`
	border-radius: 12px;
	background-color: ${props => props.theme.boxBg};
	padding: 16px;
	margin-top: 5px;
	gap: 10px;
`
export const Description = styled(Font)`
	color: ${props => props.theme.foreground};
	font-size: 14px;
	opacity: 0.7;
`
