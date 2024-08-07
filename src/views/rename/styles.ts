import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Header = styled.View`
	flex-direction: row;
	width: 100%;
	padding: 4px 8px;
	align-items: center;
	justify-content: space-between;
`
export const Body = styled.View`
	flex: 1;
	padding: 12px;
	gap: 16px;
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
`
export const GhostButton = styled(Button)`
	background: transparent;
	border-bottom-width: 0;
	width: auto;
`
export const OptionButton = styled(Button)`
	background: ${props => props.theme.background};
	border-bottom-width: 0;
	margin-bottom: 8px;
`
