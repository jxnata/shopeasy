import { Client, Databases, Account, Functions } from 'appwrite'

import { APPWRITE_PROJECT, MAIN_API_URL } from '../../constants'

const client = new Client()
client.setEndpoint(MAIN_API_URL).setProject(APPWRITE_PROJECT)

export const account = new Account(client)
export const databases = new Databases(client)
export const functions = new Functions(client)
