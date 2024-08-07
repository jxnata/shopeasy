const any = {
	primary: '#2DD4BF',
	focus: '#14B8A6',
	btnText: '#F9FAFB',
	secondary: '#EC4899',
	secondaryFocus: '#DB2777',
}

export const light = {
	background: '#F3F4F6',
	foreground: '#353e4b',
	base: '#353e4b50',
	boxBg: '#E5E7EB',
	modalBg: '#f7f8f9',
	dangerText: '#932338',
	dangerBg: '#fad7dd',
	successText: '#00864e',
	successBg: '#ccf6e4',
	...any,
	logoText: require('../assets/images/logo-text-light.png'),
}

export const dark = {
	background: '#374151',
	foreground: '#F9FAFB',
	base: '#F9FAFB50',
	boxBg: '#313a48',
	modalBg: '#2c3440',
	dangerText: '#ef7f93',
	dangerBg: '#2e0b11',
	successText: '#5ce2aa',
	successBg: '#002a18',
	logoText: require('../assets/images/logo-text-dark.png'),
	...any,
}

export default { light, dark }
