import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	padding: 24px 16px;
	justify-content: space-between;
`
export const SafeAreaView = styled.SafeAreaView`
	flex: 1;
	z-index: 2;
`
export const EmojiList = styled(Font)`
	font-size: 32px;
	letter-spacing: 2px;
`
export const Head = styled.View`
	margin-bottom: 24px;
	gap: 8px;
`
export const Body = styled.View`
	width: 100%;
	gap: 12px;
	align-items: center;
`
export const BigText = styled(Font)`
	font-size: 32px;
	font-weight: bold;
`
export const Description = styled(Font)`
	font-size: 24px;
`
export const Logo = styled.Image.attrs(({ theme }) => ({
	source: theme.logo,
}))`
	width: ${Dimensions.get('window').width}px;
	height: ${Dimensions.get('window').width}px;
	opacity: 0.1;
	position: absolute;
	left: 0;
	bottom: 0;
`
