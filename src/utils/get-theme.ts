import { light, dark, accents } from '../theme'

export const getTheme = (
	mode: 'light' | 'dark',
	accent: 'green' | 'blue' | 'orange' | 'red' | 'pink' | 'purple' | 'mono'
) => {
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
