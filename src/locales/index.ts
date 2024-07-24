import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'react-native-localize'

import en from './en.json'
import es from './es.json'
import pt from './pt.json'

const resources = {
	en,
	es,
	pt,
}

const { languageTag } = getLocales()[0]

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	lng: languageTag,
	fallbackLng: 'en',
})

export default { i18n }
