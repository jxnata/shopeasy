import { Client, Databases, Account, Functions } from 'appwrite'
import axios from 'axios'

import { APPWRITE_PROJECT, MAIN_API_URL } from '../../constants'

export const api = axios.create({ baseURL: MAIN_API_URL })

const client = new Client()
client.setEndpoint(MAIN_API_URL).setProject(APPWRITE_PROJECT)

export const account = new Account(client)
export const databases = new Databases(client)
export const functions = new Functions(client)
