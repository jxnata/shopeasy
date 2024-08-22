import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Head = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
`
export const Left = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
`
export const Text = styled(Font)`
	font-size: 24px;
	font-weight: bold;
`
