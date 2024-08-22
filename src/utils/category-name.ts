export const categoryName = (category: number) => {
	switch (category) {
		case 0:
			return 'others'
		case 1:
			return 'household'
		case 2:
			return 'office'
		case 3:
			return 'eletronics'
		case 4:
			return 'clothing'
		case 5:
			return 'music'
		case 6:
			return 'games'
		case 7:
			return 'sports'
		case 8:
			return 'dishware'
		case 9:
			return 'drinks'
		case 10:
			return 'sweet'
		case 11:
			return 'food'
		case 12:
			return 'vegetables'
		case 13:
			return 'fruits'
		default:
			return 'others'
	}
}
