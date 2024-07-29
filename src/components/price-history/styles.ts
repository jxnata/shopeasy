import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { Label } from '../../theme/global'

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
	background: ${props => props.theme.boxBg};
	border-radius: 8px;
`
export const Title = styled(Label)`
	margin-bottom: 12px;
`
export const RowText = styled(Label)`
	font-size: 12px;
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
