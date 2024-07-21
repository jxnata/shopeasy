export const randomItems = (list: string[], qty: number) => {
	return Array.from({ length: qty }, () => list[Math.floor(Math.random() * 106)])
}
