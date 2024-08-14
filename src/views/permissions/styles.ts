import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

import Pressable from '../../components/shared/pressable'
import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	padding: 12px;
`
export const SafeAreaView = styled.SafeAreaView`
	flex: 1;
`
export const PermissionContainer = styled(Animated.View)`
	justify-content: center;
	gap: 16px;
	align-items: center;
	padding: 0 16px;
`
export const Text = styled(Font)`
	font-size: 18px;
	margin-bottom: 16px;
`
export const ButtonGroup = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 16px;
`
export const Button = styled(Pressable)`
	background: transparent;
`
export const Image = styled.Image.attrs(() => ({
	resizeMode: 'contain',
}))`
	width: ${Dimensions.get('screen').width / 2}px;
	height: ${Dimensions.get('screen').width / 2}px;
`
