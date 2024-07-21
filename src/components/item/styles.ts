import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
	gap: 6px;
	background: ${props => props.theme.boxBg};
	border-radius: 12px;
	margin-bottom: 8px;
	width: auto;
`
export const Text = styled(Font)`
	font-size: 14px;
	font-weight: bold;
`
export const QuantityContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 8px;
`
export const QuantityButton = styled(Button)`
	width: 32px;
	height: 32px;
	background: ${props => props.theme.background};
	border-bottom-width: 0;
`
