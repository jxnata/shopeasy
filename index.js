import 'url-search-params-polyfill'
import { AppRegistry } from 'react-native'

import App from './App'
import { name as appName } from './app.json'
import './src/locales/index'

if (__DEV__) require('./reactotron')

AppRegistry.registerComponent(appName, () => App)
