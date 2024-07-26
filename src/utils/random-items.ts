export const randomItems = (list: string[], qty: number) => {
	const randomIndex = Math.floor(Math.random() * (127 - qty))
	return list.slice(randomIndex, randomIndex + qty)
}
