import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
	padding: 8px;
	justify-content: space-between;
`
export const Body = styled.View`
	padding: 12px 0;
	flex: 1;
`
export const Empty = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	gap: 12px;
`
export const CreateButton = styled(Button)`
	width: auto;
	padding: 4px 16px;
`
export const Text = styled(Font)`
	font-size: 18px;
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
