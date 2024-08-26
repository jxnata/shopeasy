import { BlurView } from '@react-native-community/blur'
import styled from 'styled-components/native'

import { Button, ButtonIcon } from '../../../theme/global'
import { Font } from '../pressable/styles'

export const TabButton = styled(Button)`
	width: 64px;
	height: 48px;
	padding: 4px;
	background-color: ${props => (props['aria-selected'] ? props.theme.boxBg : props.theme.boxBg + '30')};
	border-radius: 8px;
	flex-direction: column;
`
export const TabLabel = styled(Font)`
	font-size: 12px;
	font-weight: 500;
	color: ${props => props.theme.primary};
`
export const TabIcon = styled(ButtonIcon)`
	color: ${props => props.theme.primary};
`
export const Container = styled.View`
	position: absolute;
	bottom: 12px;
	left: 12px;
	right: 12px;
	overflow: hidden;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`
export const TabBar = styled.View`
	width: auto;
	border-radius: 12px;
	gap: 8px;
	overflow: hidden;
`
export const Row = styled.View`
	padding: 8px;
	flex-direction: row;
	align-items: center;
	gap: 4px;
`
export const Blur = styled(BlurView)`
	width: 100%;
	height: 74px;
	position: absolute;
`
