export const categoryNumber = (category: string) => {
	switch (category) {
		case 'others':
			return 0
		case 'household':
			return 1
		case 'office':
			return 2
		case 'eletronics':
			return 3
		case 'clothing':
			return 4
		case 'music':
			return 5
		case 'games':
			return 6
		case 'sports':
			return 7
		case 'dishware':
			return 8
		case 'drinks':
			return 9
		case 'sweet':
			return 10
		case 'food':
			return 11
		case 'vegetables':
			return 12
		case 'fruits':
			return 13
		default:
			return 0
	}
}
