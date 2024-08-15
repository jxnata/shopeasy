import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

import Icon from '../../components/icon'
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
	background-color: ${props => props.theme.boxBg};
	padding: 12px;
	border-radius: 8px;
	margin-top: 30%;
`
export const LogoContainer = styled(Animated.View)`
	position: absolute;
	left: 0;
	top: 0;
`
export const Description = styled(Font)`
	font-size: 18px;
	font-weight: 600;
	text-align: center;
	margin: 12px 0;
`
export const Button = styled.TouchableOpacity`
	width: 100%;
	background-color: #4285f4;
	height: 48px;
	padding: 0 16px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 4px;
	opacity: ${props => (props['aria-disabled'] ? 0.5 : 1)};
`
export const ButtonLabel = styled(Font)`
	font-size: 16px;
	font-weight: 600;
	font-family: initial;
	color: white;
`
export const ButtonIcon = styled(Icon)`
	margin-top: 1px;
	font-family: 'Ionicons';
	color: white;
`
export const Spinner = styled.ActivityIndicator.attrs(({ theme }) => ({
	color: 'white',
	size: 'small',
}))``
export const Logo = styled.Image.attrs(({ theme }) => ({
	source: theme.logo,
}))`
	width: ${Dimensions.get('window').width}px;
	height: ${Dimensions.get('window').width}px;
	opacity: 0.1;
	transform: rotate(90deg);
`
