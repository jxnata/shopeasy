import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex-direction: row;
	column-gap: 4px;
	position: relative;
`
export const Dot = styled.View`
	width: 8px;
	height: 8px;
	border-radius: 8px;
	background: ${props => props.theme.boxBg};
`
export const ActiveDot = styled(Animated.View)`
	width: 8px;
	height: 8px;
	border-radius: 8px;
	position: absolute;
	background: ${props => props.theme.primary};
`
