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
export const Scroll = styled.ScrollView`
	margin-top: 8px;
`
export const Title = styled(Font)`
	font-size: 24px;
	font-weight: bold;
`
export const InuptLabel = styled(Font)`
	font-size: 12px;
	font-weight: bold;
	margin-bottom: 4px;
`
export const Notice = styled(Font)`
	font-size: 12px;
	opacity: 0.7;
`
export const NoticeBox = styled.View`
	margin: 12px 0;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 12px;
	border-radius: 8px;
	background-color: ${props => props.theme.boxBg};
`
export const Row = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
	margin-top: 12px;
	margin-bottom: 24px;
`
export const Col = styled.View`
	flex-direction: column;
`
export const Separator = styled.View`
	margin-top: 8px;
`
