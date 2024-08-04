import styled from 'styled-components/native'

import { Button, ButtonLabel, Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => props.theme.background};
	padding: 12px;
`
export const SafeAreaView = styled.SafeAreaView`
	flex: 1;
`
export const EmojiList = styled(Font)`
	font-size: 32px;
	letter-spacing: 2px;
`
export const Head = styled.View`
	align-items: center;
`
export const Body = styled.View`
	padding-top: 48px;
`
export const Description = styled(Font)`
	font-size: 16px;
	margin-bottom: 16px;
`
export const FeatureList = styled.View`
	gap: 12px;
	width: 100%;
`
export const FeatureText = styled(Font)`
	font-size: 16px;
	font-weight: 600;
`
export const CloseButton = styled.Pressable`
	position: absolute;
	top: 0;
	right: 8px;
	background-color: ${props => props.theme.boxBg};
	width: 32px;
	height: 32px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`
export const Offer = styled.View`
	width: 100%;
	gap: 8px;
`
export const OfferButton = styled(Button)`
	background: transparent;
	border-radius: 12px;
	border: solid 2px ${props => (props['aria-checked'] ? props.theme.primary : props.theme.base)};
	border-bottom-width: 2px;
	border-bottom-color: ${props => (props['aria-checked'] ? props.theme.primary : props.theme.base)};
	flex-direction: column;
	height: auto;
	padding: 8px 16px;
	align-items: flex-start;
`
export const OfferTitle = styled(Font)`
	font-weight: bold;
`
export const OfferDescription = styled(Font)`
	font-size: 14px;
`
export const OfferBadge = styled.View`
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	padding: 2px 6px;
	background-color: ${props => props.theme.secondary};
	position: absolute;
	top: 5px;
	right: 5px;
`
export const OfferBadgeText = styled(ButtonLabel)`
	font-size: 12px;
	font-weight: 600;
`
export const ButtonContainer = styled.View`
	margin-top: 12px;
	gap: 8px;
`
export const RestoreButton = styled(Button)`
	padding: 8px;
	border-bottom-width: 0;
	background: transparent;
	height: auto;
	align-items: center;
`
export const RestoreText = styled(Font)`
	font-size: 14px;
	font-weight: 500;
	color: ${props => props.theme.primary};
`
export const Logo = styled.Image.attrs(({ theme }) => ({
	source: theme.logoText,
}))`
	width: 128px;
	height: 48px;
`
