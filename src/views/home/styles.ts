import { BlurView } from '@react-native-community/blur'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Body = styled.View`
	flex: 1;
	padding: 12px;
`
export const Empty = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	gap: 12px;
`
export const HeaderButton = styled(Button)`
	width: auto;
	height: auto;
	border-radius: 16px;
	padding: 0;
	background-color: transparent;
`
export const CreateButton = styled(Button)`
	width: auto;
	padding: 4px 16px;
`
export const Text = styled(Font)`
	font-size: 18px;
	opacity: 0.7;
`
export const AddButton = styled(Button)`
	width: auto;
	position: absolute;
	bottom: 16px;
	right: 16px;
	z-index: 2;
`
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
`
export const TabBar = styled.View`
	position: absolute;
	bottom: 32px;
	left: 12px;
	right: 12px;
	padding: 8px;
	border-radius: 12px;
	align-items: center;
	flex-direction: row;
	gap: 12px;
	overflow: hidden;
`
export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 4px;
`
export const Blur = styled(BlurView)`
	width: ${Dimensions.get('screen').width - 24}px;
	height: 74px;
	position: absolute;
	top: 0;
`
