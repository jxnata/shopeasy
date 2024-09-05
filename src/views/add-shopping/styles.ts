import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
`
export const Body = styled.View`
	padding: 12px;
	flex: 1;
`
export const Col = styled.View`
	flex-direction: row;
	align-items: flex-end;
	width: 100%;
	gap: 8px;
`
export const ButtonContainer = styled.View`
	margin-bottom: 5px;
	flex: 1;
`
export const Text = styled(Font)`
	font-size: 18px;
`
