import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Body = styled.View`
	flex: 1;
	padding: 12px;
`
export const Avatar = styled.Image`
	width: 128px;
	height: 128px;
	border-radius: 64px;
	border: solid 3px ${props => props.theme.primary};
`
export const Scroll = styled.ScrollView``
export const InfoContainer = styled.View`
	background: ${props => props.theme.modalBg};
	margin-top: 16px;
	padding: 8px;
	border-radius: 8px;
	gap: 8px;
	width: 100%;
`
export const EmptyText = styled(Font)`
	font-weight: 400;
`
export const InfoRow = styled.View`
	padding: 8px;
	border-radius: 8px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background: ${props => props.theme.boxBg};
`
export const InfoLabel = styled(Font)`
	font-weight: bold;
`
export const InfoValue = styled(Font)`
	font-weight: 500;
	text-align: right;
`
export const InfoPercentage = styled(Font)`
	font-weight: 500;
	text-align: right;
	color: ${props => (props['aria-checked'] ? props.theme.dangerText : props.theme.successText)};
`
export const InfoSmallTitle = styled(Font)`
	font-size: 14px;
	font-weight: 500;
	text-align: right;
`
export const InfoSmallText = styled(Font)`
	font-size: 12px;
	font-weight: 500;
	opacity: 0.8;
	text-align: right;
`
export const InfoRight = styled.View`
	flex-direction: column;
	justify-content: right;
`
export const EmptyContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
