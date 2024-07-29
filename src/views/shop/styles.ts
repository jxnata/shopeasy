import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
	padding: 8px;
`
export const Header = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: center;
	padding: 4px 8px;
`
export const Body = styled.View`
	flex: 1;
`
export const Scroll = styled.ScrollView`
	margin-top: 8px;
`
export const TipContainer = styled.Pressable`
	flex-direction: row;
	align-items: center;
	gap: 8px;
	background: ${props => props.theme.boxBg};
	padding: 8px;
	border-radius: 8px;
	margin: 8px 0;
	opacity: 0.6;
`
export const Tip = styled(Font)`
	font-size: 14px;
	font-weight: 400;
	max-width: 90%;
`
export const Title = styled(Font)`
	font-size: 24px;
	font-weight: bold;
`
export const ListHeader = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 8px;
	padding: 0 4px;
`
export const Text = styled(Font)`
	font-size: 14px;
	font-weight: bold;
`
export const AddButton = styled(Button)`
	background: transparent;
	border-bottom-width: 0;
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
