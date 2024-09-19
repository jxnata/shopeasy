import { BlurView } from '@react-native-community/blur'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { Button, ButtonLabel, Font, Label } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Body = styled.View`
	flex: 1;
	padding: 12px;
`
export const Scroll = styled.ScrollView`
	margin-top: 8px;
`
export const Suggestions = styled.View`
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 4px;
	justify-content: center;
`
export const Title = styled(Font)`
	font-size: 24px;
	font-weight: bold;
`
export const ButtonsContainer = styled.View`
	flex-direction: row;
	gap: 8px;
	align-items: center;
	justify-content: space-between;
`
export const AddButton = styled(Button)`
	background: transparent;
	height: auto;
	margin-bottom: 12px;
	flex: 1;
`
export const GhostButton = styled(Button)`
	background: transparent;
	border-bottom-width: 0;
	width: 32px;
	height: 32px;
	padding: 0;
`
export const OptionButton = styled(Button)`
	background: ${props => props.theme.background};
	border-bottom-width: 0;
	margin-bottom: 8px;
	flex: 1;
`
export const DangerOption = styled(OptionButton)`
	background: ${props => props.theme.dangerBg};
`
export const OptionGroup = styled.View`
	flex-direction: row;
	gap: 8px;
`
export const CartLeft = styled.View`
	flex: 1;
	gap: 8px;
`
export const CartTotal = styled.View`
	flex-direction: row;
	align-items: baseline;
	gap: 4px;
`
export const OutlineButton = styled(Button)`
	background: transparent;
	border: solid 2px ${props => props.theme.primary};
	width: auto;
	padding: 4px 16px;
	opacity: ${props => (props['aria-disabled'] ? 0.6 : 1)};
`
export const OutlineText = styled(Label)`
	font-size: 14px;
	font-weight: bold;
`
export const FinishButton = styled(Button)`
	width: auto;
	padding: 4px 16px;
	opacity: ${props => (props['aria-disabled'] ? 0.6 : 1)};
`
export const FinishedText = styled(ButtonLabel)`
	font-size: 14px;
	font-weight: bold;
`
export const Total = styled(Font)`
	font-size: 16px;
`
export const Cart = styled.View`
	position: absolute;
	bottom: 12px;
	left: 12px;
	right: 12px;
	padding: 12px;
	border-radius: 12px;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
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
export const Separator = styled.View`
	margin-top: 8px;
`
