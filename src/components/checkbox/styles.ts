import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Container = styled.View`
	gap: 5px;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
`
export const Button = styled.Pressable`
	flex: 1;
	padding: 10px;
	border-radius: 8px;
	height: 40px;
	align-items: center;
	border-width: 1.5px;
	border-color: ${props => (props['aria-selected'] ? props.theme.foreground : props.theme.border)};
`
export const ButtonText = styled(Font)`
	font-size: 12px;
	font-weight: 600;
	color: ${props => props.theme.foreground};
`
