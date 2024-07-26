import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	background-color: ${props => props.theme.background};
	padding: 24px 12px;
	justify-content: space-between;
`
export const SafeAreaView = styled.SafeAreaView`
	flex: 1;
`
export const EmojiList = styled(Font)`
	font-size: 32px;
	letter-spacing: 2px;
`
export const Head = styled.View`
	align-items: center;
	margin-bottom: 24px;
	gap: 8px;
`
export const Body = styled.View`
	width: 100%;
	gap: 12px;
	align-items: center;
`
export const Title = styled(Font)`
	font-size: 24px;
	font-weight: bold;
	margin: 12px 0;
`
export const Description = styled(Font)`
	font-size: 16px;
	text-align: center;
`
export const Logo = styled.Image.attrs(({ theme }) => ({
	source: theme.logoText,
}))`
	width: 128px;
	height: 48px;
`
