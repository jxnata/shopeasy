import styled from 'styled-components/native'

import Pressable from '../../components/shared/pressable'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	padding: 12px;
	justify-content: space-between;
`
export const Head = styled.View`
	flex-direction: row;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`
export const SafeAreaView = styled.SafeAreaView`
	flex: 1;
`
export const Button = styled(Pressable)`
	background: transparent;
`
export const Footer = styled.View`
	justify-content: center;
	align-items: center;
	flex: 0.4;
	padding-bottom: 16px;
	gap: 24px;
	align-items: center;
`
