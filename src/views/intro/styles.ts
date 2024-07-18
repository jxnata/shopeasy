import styled from 'styled-components/native'
import { Button, Font } from '../../theme/global'

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
  margin-bottom: 24px;
`
export const Body = styled.View`
  padding-top: 48px;
`
export const Title = styled(Font)`
  font-size: 24px;
  font-weight: bold;
  margin: 12px 0;
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
export const Logo = styled.Image.attrs(({ theme }) => ({
  source: theme.logoText,
}))`
  width: 128px;
  height: 48px;
`