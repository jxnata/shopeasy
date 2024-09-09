import { Dimensions } from 'react-native'
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
export const Head = styled.View`
	align-items: center;
`
export const Body = styled.View`
	padding-top: 12px;
`
export const Description = styled(Font)`
	font-size: 16px;
	margin-bottom: 16px;
	font-weight: bold;
	opacity: 0.9;
`
export const FeatureList = styled.View`
	gap: 12px;
	width: 100%;
`
export const FeatureLine = styled.View`
	gap: 4px;
	flex-direction: row;
	align-items: center;
`
export const FeatureText = styled(Font)`
	font-size: 16px;
	font-weight: 600;
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
export const Offer = styled.View`
	width: 100%;
	gap: 8px;
`
export const OfferProducts = styled.View`
	width: 100%;
	gap: 8px;
	flex-direction: row;
	justify-content: space-around;
`
export const OfferButton = styled(Button)`
	width: ${Dimensions.get('screen').width / 3.4}px;
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
export const OfferTitleContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 2px;
`
export const OfferTitle = styled(Font)`
	font-weight: bold;
`
export const OfferPrice = styled(Font)`
	color: #d28600;
	font-weight: bold;
	font-size: 14px;
`
export const OfferDescription = styled(Font)`
	font-size: 14px;
`
export const OfferBadge = styled.View`
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	padding: 2px 6px;
	background-color: #d28600;
	position: absolute;
	top: 5px;
	right: 5px;
`
export const OfferBadgeText = styled(ButtonLabel)`
	font-size: 12px;
	font-weight: 600;
	color: white;
`
export const TermsContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-bottom: 12px;
	gap: 8px;
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
export const Logo = styled.Image`
	width: 96px;
	height: 96px;
	border-radius: 12px;
	margin-bottom: 16px;
`
