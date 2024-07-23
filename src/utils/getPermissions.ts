import { Permission, Role } from 'appwrite'

export const getPermissions = (userId: string) => {
	return [
		Permission.read(Role.user(userId)),
		Permission.update(Role.user(userId)),
		Permission.delete(Role.user(userId)),
	]
}
