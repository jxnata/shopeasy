import styled from 'styled-components/native'

import Icon from '../../components/icon'
import { Button } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Body = styled.View`
	flex: 1;
	padding: 12px;
`
export const CancelButton = styled(Button)`
	background: transparent;
	height: auto;
	margin: 24px 0;
`
export const GhostButton = styled(Button)`
	background: transparent;
	border-bottom-width: 0;
	width: 32px;
	height: 32px;
	padding: 0;
`
export const TrashIcon = styled(Icon)`
	color: ${props => props.theme.dangerText};
	font-family: 'Ionicons';
	font-size: 24px;
`
export const Separator = styled.View`
	margin-top: 12px;
`
