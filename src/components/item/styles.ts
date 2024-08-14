import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const ItemContainer = styled.View`
	flex-direction: column;
	gap: 8px;
`
export const Container = styled.View`
	flex-direction: column;
	gap: 4px;
	background: ${props => props.theme.boxBg};
	border-radius: 12px;
	margin-bottom: 8px;
	padding: 12px;
`
export const Collapsed = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 6px;
	width: auto;
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
`
export const SmallContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	gap: 4px;
	opacity: 0.8;
`
export const Text = styled(Font)`
	font-size: 14px;
	font-weight: bold;
`
export const Small = styled(Font)`
	font-size: 12px;
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
	padding: 0;
`
export const CollapsedContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
	margin-top: 8px;
`
export const Col = styled.View`
	flex-direction: column;
	gap: 8px;
`
export const Row = styled.View`
	flex-direction: row;
	gap: 8px;
`
export const SaveButton = styled(Button)`
	background: ${props => props.theme.secondary};
	width: auto;
	height: 32px;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
	border-bottom-width: 2px;
	border-bottom-color: ${props => props.theme.secondaryFocus};
`
