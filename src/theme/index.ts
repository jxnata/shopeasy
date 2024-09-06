export const light = {
	background: '#F7F7F7',
	foreground: '#333333',
	base: '#22222250',
	boxBg: '#E5E7EB',
	modalBg: '#F2F2F2',
	dangerText: '#932338',
	dangerBg: '#fad7dd',
	successText: '#00864e',
	successBg: '#ccf6e4',
	shadow: '#000',
	logo: require('../assets/images/logo-light.png'),
	primary: '',
	secondary: '',
}

export const dark = {
	background: '#222222',
	foreground: '#F9FAFB',
	base: '#F7F7F750',
	boxBg: '#383838',
	modalBg: '#303030',
	dangerText: '#ef7f93',
	dangerBg: '#2e0b11',
	successText: '#5ce2aa',
	successBg: '#002a18',
	shadow: 'transparent',
	logo: require('../assets/images/logo-dark.png'),
	primary: '',
	secondary: '',
}

export const accents = {
	green: {
		primary: '#04773B',
		secondary: '#cce3d7',
	},
	blue: {
		primary: '#0077B6',
		secondary: '#cce3f0',
	},
	orange: {
		primary: '#E76F51',
		secondary: '#fae2dc',
	},
	red: {
		primary: '#BB4430',
		secondary: '#f1d9d5',
	},
	pink: {
		primary: '#FF579F',
		secondary: '#ffddeb',
	},
	purple: {
		primary: '#7b2cbf',
		secondary: '#e4d4f2',
	},
	mono: {
		dark: {
			primary: '#F7F7F7',
			secondary: '#333333',
		},
		light: {
			primary: '#222222',
			secondary: '#F9FAFB',
		},
	},
}

export default { light, dark, accents }
