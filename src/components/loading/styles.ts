import styled from 'styled-components/native'

export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.background};
`
export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
	color: theme.foreground,
	size: 'large',
}))``
