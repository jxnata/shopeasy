import axios from 'axios'

import { MAIN_API_URL } from '../../../constants'

export const api = axios.create({ baseURL: MAIN_API_URL })
