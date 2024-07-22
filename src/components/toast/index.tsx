import Toast, { BaseToastProps, ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message'

import theme from '../../theme'

export const toastConfig = (scheme: 'dark' | 'light') => {
	const colors = theme[scheme]

	return {
		success: (props: BaseToastProps) => (
			<SuccessToast
				{...props}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				style={{ borderLeftColor: colors.successText, backgroundColor: colors.boxBg }}
				text1Style={{
					color: colors.foreground,
					fontSize: 14,
					fontWeight: '400',
					fontFamily: 'Nunito',
				}}
				text1NumberOfLines={2}
			/>
		),
		info: (props: BaseToastProps) => (
			<InfoToast
				{...props}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				style={{ borderLeftColor: colors.boxBg, backgroundColor: colors.boxBg }}
				text1Style={{
					color: colors.foreground,
					fontSize: 14,
					fontWeight: '400',
					fontFamily: 'Nunito',
				}}
				text1NumberOfLines={2}
			/>
		),
		error: (props: BaseToastProps) => (
			<ErrorToast
				{...props}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				style={{ borderLeftColor: colors.dangerText, backgroundColor: colors.boxBg }}
				text1Style={{
					color: colors.foreground,
					fontSize: 14,
					fontWeight: '400',
					fontFamily: 'Nunito',
				}}
				text1NumberOfLines={2}
			/>
		),
	}
}

export const toast = {
	success: (message: string) => Toast.show({ text1: message, type: 'success', visibilityTime: 3000 }),
	error: (message: string) => Toast.show({ text1: message, type: 'error', visibilityTime: 3000 }),
	info: (message: string) => Toast.show({ text1: message, type: 'info', visibilityTime: 3000 }),
}
