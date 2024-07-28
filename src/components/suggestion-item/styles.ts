import styled from 'styled-components/native'

import { Font } from '../../theme/global'
import Icon from '../icon'

export const Container = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	padding: 12px;
	gap: 6px;
	background: ${props => props.theme.boxBg};
	border-radius: 12px;
	margin-bottom: 8px;
	width: auto;
`
export const Text = styled(Font)`
	font-size: 14px;
	font-weight: bold;
`
export const RightIcon = styled(Icon)`
	font-family: 'Ionicons';
	color: ${props => (props['aria-checked'] ? props.theme.successText : props.theme.foreground)};
`
