import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
	padding: 8px;
`
export const Body = styled.View`
	flex: 1;
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
export const AddButton = styled(Button)`
	background: transparent;
	border-bottom-width: 0;
	height: auto;
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
`
