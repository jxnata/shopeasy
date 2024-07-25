import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

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
export const Scroll = styled.ScrollView``
