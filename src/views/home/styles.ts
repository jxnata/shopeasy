import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Body = styled.View`
	flex: 1;
	padding: 12px;
`
export const Empty = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	gap: 12px;
`
export const HeaderButton = styled(Button)`
	width: auto;
	height: auto;
	border-radius: 16px;
	padding: 0;
	background-color: transparent;
`
export const CreateButton = styled(Button)`
	width: auto;
	padding: 4px 16px;
`
export const Text = styled(Font)`
	font-size: 18px;
	opacity: 0.7;
`
export const AddButton = styled(Button)`
	width: auto;
	position: absolute;
	bottom: 16px;
	right: 16px;
	z-index: 2;
`
export const MenuContainer = styled.View``
export const MenuList = styled.ScrollView``
