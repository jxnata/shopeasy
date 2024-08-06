import { Animated } from 'react-native'
import styled from 'styled-components/native'

interface SkeletonProps {
	width?: string | number
	height?: string | number
	radius?: string | number
}

export const SkeletonContainer = styled.View<SkeletonProps>`
	background-color: ${props => props.theme.boxBg}70;
	width: ${props => (typeof props.width === 'number' ? `${props.width}px` : props.width || '100%')};
	height: ${props => (typeof props.height === 'number' ? `${props.height}px` : props.height || '20px')};
	border-radius: ${props => (typeof props.radius === 'number' ? `${props.radius}px` : props.radius || '4px')};
	overflow: hidden;
`

export const SkeletonAnimation = styled(Animated.View)`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.boxBg};
`
