import { ColorSchemeName } from 'react-native'

import { light, dark, accents } from '../theme'
import { AppColor } from '../types/all/colors'

export const getTheme = (mode: ColorSchemeName, accent: AppColor) => {
	let theme = null

	switch (mode) {
		case 'light':
			theme = light
			break
		case 'dark':
			theme = dark
			break
		default:
			return light
	}

	if (accent === 'mono') return { ...theme, ...accents.mono[mode] }

	return { ...theme, ...accents[accent] }
}
