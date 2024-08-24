import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'
import Icon from '../icon'

export const Container = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 12px;
	gap: 6px;
	border: dashed 1px ${props => props.theme.foreground}70;
	border-radius: 8px;
	margin-bottom: 8px;
	width: 100%;
`
export const Text = styled(Font)`
	font-size: 14px;
	font-weight: bold;
	color: ${props => props.theme.foreground}70;
`
export const Buttons = styled.View`
	flex-direction: row;
	gap: 8px;
	align-items: center;
	justify-content: space-between;
`
export const Accept = styled(TouchableOpacity)`
	background: transparent;
	border: solid 1px ${props => props.theme.foreground}70;
	border-radius: 8px;
	height: 32px;
	padding: 0 12px;
	align-items: center;
	justify-content: center;
`
export const AcceptText = styled(Font)`
	color: ${props => props.theme.foreground}70;
	font-size: 12px;
`
export const RemoveIcon = styled(Icon)`
	color: ${props => props.theme.foreground}70;
	font-family: 'Ionicons';
	font-size: 16px;
`
export const Remove = styled(Accept)`
	padding: 0;
	width: 32px;
`
