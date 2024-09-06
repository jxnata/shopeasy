import styled from 'styled-components/native'

import { Label } from '../../theme/global'

export const BarContainer = styled.View`
	align-items: center;
	justify-content: flex-end;
	margin: 0 8px;
`
export const Bar = styled.View`
	width: 32px;
	border-radius: 8px;
	background: ${props => props.theme.primary};
`
export const LabelDate = styled(Label)`
	margin-top: 4px;
	font-size: 12px;
	font-weight: 500;
	text-align: center;
`
export const LabelPrice = styled(Label)`
	margin-bottom: 4px;
	font-size: 10px;
	font-weight: 500;
	text-align: center;
`
