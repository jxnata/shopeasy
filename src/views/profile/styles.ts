import styled from 'styled-components/native'

import { Button, Font } from '../../theme/global'

export const Content = styled.SafeAreaView`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Body = styled.View`
	flex: 1;
	padding: 12px;
	align-items: center;
`
export const Avatar = styled.Image`
	width: 128px;
	height: 128px;
	border-radius: 64px;
	border: solid 3px ${props => props.theme.primary};
`
export const InfoContainer = styled.View`
	background: ${props => props.theme.modalBg};
	margin: 32px 8px 8px 8px;
	padding: 8px;
	border-radius: 8px;
	gap: 8px;
	width: 100%;
`
export const InfoRow = styled.View`
	padding: 8px;
	border-radius: 8px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background: ${props => props.theme.boxBg};
`
export const InfoLabel = styled(Font)`
	font-weight: bold;
`
export const InfoValue = styled(Font)`
	font-weight: 500;
`
export const LogoutButton = styled(Button)`
	border-bottom-width: 0;
	height: 48px;
	margin-top: 16px;
	background: ${props => props.theme.background};
`
export const PremiumButton = styled(LogoutButton)`
	background: ${props => props.theme.secondary};
`
