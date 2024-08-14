import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	background-color: ${props => props.theme.background};
	padding: 24px 12px;
	justify-content: center;
`
export const SafeAreaView = styled.SafeAreaView`
	flex: 1;
`
export const Body = styled(Animated.View)`
	width: 100%;
	gap: 12px;
	align-items: center;
	justify-content: center;
`
export const LogoContainer = styled(Animated.View)`
	position: absolute;
	left: 0;
	top: 0;
`
export const Description = styled(Font)`
	font-size: 18px;
	text-align: center;
`
export const Logo = styled.Image.attrs(({ theme }) => ({
	source: theme.logo,
}))`
	width: ${Dimensions.get('window').width}px;
	height: ${Dimensions.get('window').width}px;
	opacity: 0.1;
	transform: rotate(90deg);
`
