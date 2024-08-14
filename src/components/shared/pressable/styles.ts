import styled from 'styled-components/native'

import Icon from '../../icon'

export const Font = styled.Text`
	font-family: 'Nunito';
	color: ${props => props.theme.foreground};
	font-size: 16px;
`
export const Button = styled.TouchableOpacity`
	background-color: ${props => (props['aria-label'] === 'primary' ? props.theme.primary : props.theme.secondary)};
	height: 48px;
	padding: 0 16px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 4px;
	opacity: ${props => (props['aria-disabled'] ? 0.5 : 1)};
	shadow-color: ${props => props.theme.shadow};
	shadow-offset: 0px 16px;
	shadow-opacity: ${props => (props['aria-label'] === 'primary' ? 0.2 : 0)};
	shadow-radius: 8px;
	elevation: 4;
`
export const Label = styled(Font)`
	font-size: 16px;
	font-weight: 800;
`
export const ButtonLabel = styled(Label)`
	color: ${props => (props['aria-label'] === 'primary' ? props.theme.secondary : props.theme.primary)};
`
export const ButtonIcon = styled(Icon)`
	margin-top: 1px;
	font-family: 'Ionicons';
	color: ${props => (props['aria-label'] === 'primary' ? props.theme.secondary : props.theme.primary)};
`
export const Spinner = styled.ActivityIndicator.attrs(({ theme }) => ({
	color: theme.foreground,
	size: 'small',
}))``
