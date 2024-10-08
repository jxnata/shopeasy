import { Dimensions, FlatList } from 'react-native'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

const { height } = Dimensions.get('window')

export const DropdowContainer = styled.View`
	gap: 2px;
`
export const Input = styled.Pressable`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
	height: 32px;
	padding: 0 8px;
	border-radius: 8px;
	border: solid 2px ${props => (props['aria-selected'] ? props.theme.foreground : props.theme.base)};
	background: ${props => props.theme.background};
`
export const Placeholder = styled(Font)`
	font-size: 14px;
	color: ${props => props.theme.foreground};
`
export const Container = styled.Pressable`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.background}de;
`
export const Content = styled.SafeAreaView`
	display: flex;
	width: 100%;
	max-height: ${height * 0.6}px;
	align-items: center;
	border-radius: 10px;
	background-color: ${props => props.theme.boxBg};
`
export const Item = styled.Pressable`
	flex-direction: row;
	align-items: center;
	border-radius: 12px;
	background-color: ${props => props.theme.background}70;
	padding: 16px;
	margin-top: 5px;
	gap: 10px;
`
export const Text = styled(Font)``
export const Label = styled(Font)`
	font-size: 12px;
	font-weight: bold;
`
export const Space = styled.View`
	height: 30px;
`
export const List = styled.FlatList`
	width: 100%;
	padding: 10px;
` as typeof FlatList
