import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { Label } from '../../theme/global'
const { width } = Dimensions.get('screen')

export const Container = styled.TouchableOpacity`
	border-radius: 12px;
	background: ${props => props.theme.boxBg};
	width: ${width / 4}px;
	height: ${width / 4}px;
	margin-right: 8px;
`
export const IconContainer = styled.View`
	padding-left: 12px;
	padding-top: 8px;
	opacity: ${props => (props['aria-selected'] ? 1 : 0.3)};
`
export const TextContainer = styled.View`
	position: absolute;
	bottom: 12px;
	left: 12px;
`
export const Text = styled(Label)`
	font-size: 12px;
`
