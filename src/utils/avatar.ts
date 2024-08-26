export const avatar = (seed: string, bg?: string) => {
	return `https://api.dicebear.com/9.x/notionists-neutral/png?seed=${seed}&size=256&backgroundColor=${bg ? bg.replace('#', '') : 'ffffff'}`
}
