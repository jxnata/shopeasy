import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const CategoryContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`
export const CategoryTag = styled.View`
	background: ${props => props.theme.secondary};
	padding: 4px 12px;
	border-radius: 8px;
	margin-top: 8px;
`
export const CategoryText = styled(Font)`
	font-weight: bold;
	color: ${props => props.theme.secondary};
`
