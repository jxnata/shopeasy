import styled from 'styled-components/native'

type ProgressProps = {
	percentage: number
}

export const ProgressBar = styled.View`
	width: 100%;
	height: 12px;
	border-radius: 8px;
	background-color: ${props => props.theme.boxBg};
`
export const ProgressFill = styled.View<ProgressProps>`
	height: 100%;
	border-radius: 8px;
	position: absolute;
	top: 0;
	left: 0;
	background-color: ${props => props.theme.primary};
	width: ${props => `${props.percentage}%`};
`
