const any = {
	primary: '#2DD4BF',
	focus: '#14B8A6',
	secondary: '#EC4899',
	secondaryFocus: '#DB2777',
}

export const light = {
	background: '#F3F4F6',
	foreground: '#1F2937',
	base: '#1F293750',
	boxBg: '#E5E7EB',
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
	dangerText: '#ef7f93',
	dangerBg: '#2e0b11',
	successText: '#5ce2aa',
	successBg: '#002a18',
	logoText: require('../assets/images/logo-text-dark.png'),
	...any,
}

export default { light, dark }
