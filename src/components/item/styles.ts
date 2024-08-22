import styled from 'styled-components/native'

import { Button, ButtonIcon, Font } from '../../theme/global'

export const Container = styled.View`
	flex-direction: column;
	gap: 4px;
	background: ${props => props.theme.boxBg};
	border-radius: 8px;
	margin-bottom: 8px;
	padding: 8px 12px;
`
export const Collapsed = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
	width: auto;
	opacity: ${props => (props['aria-checked'] ? 0.4 : 1)};
`
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
export const RowContainer = styled.TouchableOpacity`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
export const SmallContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	opacity: 0.8;
`
export const Col = styled.View``
export const ColRight = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 4px;
`
export const Text = styled(Font)`
	font-size: 16px;
	font-weight: bold;
	text-decoration-line: ${props => (props['aria-checked'] ? 'line-through' : 'none')};
`
export const Small = styled(Font)`
	font-size: 12px;
	font-weight: bold;
	opacity: 0.8;
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
	padding: 0;
`
export const CollapsedContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
	margin-top: 8px;
`
export const Row = styled.View`
	flex-direction: row;
	gap: 8px;
	align-items: flex-end;
`
export const SaveButton = styled(Button)`
	width: auto;
	height: 32px;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
`
export const CheckButton = styled(Button)`
	background: transparent;
	width: 32px;
	height: 32px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	border-bottom-width: 0;
	padding: 0;
`
export const CheckIcon = styled(ButtonIcon)`
	color: ${props => props.theme.primary};
`
