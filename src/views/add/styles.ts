import styled from 'styled-components/native'

import { Font } from '../../theme/global'

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
	padding: 12px;
	flex: 1;
`
export const Scroll = styled.ScrollView`
	margin-top: 12px;
`
export const Suggestions = styled.View`
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 4px;
	justify-content: center;
`
export const Empty = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	gap: 12px;
`
export const Title = styled(Font)`
	font-size: 24px;
	font-weight: bold;
`
export const Text = styled(Font)`
	font-size: 18px;
`
