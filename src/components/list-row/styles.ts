import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Container = styled.View`
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
	color: ${props => props.theme.foreground};
`
export const Column = styled.TouchableOpacity`
	flex: 1;
	flex-direction: column;
`
export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 2px;
`
export const CopyButton = styled.TouchableOpacity`
	padding: 8px;
	align-items: center;
	justify-content: center;
`
