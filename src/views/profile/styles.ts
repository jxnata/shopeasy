import styled from 'styled-components/native'

import { Button, ButtonIcon, Font } from '../../theme/global'

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
	width: 72px;
	height: 72px;
	border-radius: 64px;
	border: solid 3px ${props => props.theme.secondary};
`
export const InfoContainer = styled.View`
	background: ${props => props.theme.boxBg}60;
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
`
export const InfoLabel = styled(Font)`
	font-weight: bold;
`
export const ButtonLabel = styled(Font)`
	font-weight: bold;
	color: ${props => props.theme.primary};
`
export const InfoValue = styled(Font)`
	font-weight: 400;
	opacity: 0.8;
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
export const PremiumIcon = styled(ButtonIcon)`
	color: ${props => props.theme.primary};
`
export const CloseButton = styled.Pressable`
	position: absolute;
	top: 12px;
	right: 8px;
	background-color: ${props => props.theme.boxBg};
	width: 32px;
	height: 32px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`
export const ColorContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 4px;
	padding: 8px;
	border-radius: 8px;
	background: ${props => props.theme.boxBg};
`
export const Color = styled.TouchableOpacity`
	width: 24px;
	height: 24px;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	border: solid 2px transparent;
`
export const DevInfo = styled.View`
	padding: 8px;
	flex-direction: row;
	align-items: center;
	gap: 4px;
`
export const DevInfoText = styled(Font)`
	font-size: 12px;
`
export const DevInfoLink = styled(Font)`
	font-size: 12px;
	font-weight: bold;
`
