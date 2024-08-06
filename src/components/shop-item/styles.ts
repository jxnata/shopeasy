import styled from 'styled-components/native'

import { ButtonLabel, Font } from '../../theme/global'

export const Container = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 12px 16px;
	gap: 4px;
	background: ${props => props.theme.boxBg};
	border-radius: 12px;
	margin-bottom: 8px;
`
export const Title = styled(Font)`
	font-size: 16px;
	font-weight: bold;
`
export const Description = styled(Font)`
	font-size: 12px;
	color: ${props => props.theme.foreground}60;
`
export const Column = styled.View`
	flex-direction: column;
`
export const BadgePrice = styled.View`
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	padding: 2px 6px;
	background-color: ${props => props.theme.secondary};
	position: absolute;
	top: 5px;
	right: 5px;
`
export const BadgePriceText = styled(ButtonLabel)`
	font-size: 12px;
	font-weight: 600;
`
