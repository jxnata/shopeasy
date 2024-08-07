import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	margin-top: 24px;
	margin-bottom: 8px;
`
export const X = styled(Font)`
	font-size: 12px;
`
export const CloseButton = styled.Pressable`
	position: absolute;
	top: -24px;
	right: 0px;
	background-color: ${props => props.theme.boxBg};
	width: 24px;
	height: 24px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	z-index: 100;
`
