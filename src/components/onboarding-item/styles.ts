import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: ${Dimensions.get('screen').width - 24}px;
	align-items: center;
`
export const Title = styled(Animated.Text)`
	font-family: 'Nunito';
	color: ${props => props.theme.foreground};
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 12px;
`
export const Description = styled(Title)`
	opacity: 0.8;
	font-size: 16px;
	font-weight: 500;
	width: 80%;
	text-align: center;
`
export const Image = styled(Animated.Image).attrs(() => ({
	resizeMode: 'contain',
}))`
	width: ${Dimensions.get('screen').width / 2}px;
	height: ${Dimensions.get('screen').width / 2}px;
	margin-bottom: 12px;
`
