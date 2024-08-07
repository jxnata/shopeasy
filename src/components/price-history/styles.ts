import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { Font, Label } from '../../theme/global'

const { height } = Dimensions.get('window')

export const Container = styled.Pressable`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.background}de;
`
export const Content = styled.View`
	width: 100%;
	max-height: ${height * 0.6}px;
	padding: 12px 8px;
	background: ${props => props.theme.modalBg};
	border-radius: 8px;
`
export const Title = styled(Label)`
	margin-bottom: 16px;
`
export const LocalCol = styled.View`
	flex-direction: col;
	gap: 4px;
`
export const PremiumContainer = styled.TouchableOpacity`
	background: ${props => props.theme.boxBg};
	border-radius: 8px;
	padding: 12px;
`
export const Premium = styled(Label)`
	text-align: center;
	font-size: 18px;
`
export const RowTitle = styled(Label)`
	font-size: 12px;
`
export const RowText = styled(Label)`
	font-size: 12px;
	font-weight: 600;
`
export const RowValue = styled(Label)`
	font-size: 12px;
	font-weight: 600;
`
export const RowSmall = styled(Label)`
	font-size: 10px;
	opacity: 0.8;
`
export const Date = styled(Label)`
	opacity: 0.7;
`
export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 8px;
	background: ${props => props.theme.background};
	padding: 8px;
	border-radius: 8px;
`
export const ListHeader = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 8px;
	padding: 0 4px;
`
export const Text = styled(Label)`
	font-size: 14px;
	font-weight: bold;
`
export const EmptyText = styled(Label)`
	font-size: 14px;
	text-align: center;
	opacity: 0.7;
`
export const X = styled(Font)`
	font-size: 12px;
`
export const CloseButton = styled.Pressable`
	position: absolute;
	top: 8px;
	right: 8px;
	background-color: ${props => props.theme.background};
	width: 32px;
	height: 32px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	z-index: 100;
`
