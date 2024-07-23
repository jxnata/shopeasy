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
			return 'food_sweet'
		case 11:
			return 'food_marine'
		case 12:
			return 'food_asian'
		case 13:
			return 'food_prepared'
		case 14:
			return 'vegetables'
		case 15:
			return 'fruits'
	}
}
