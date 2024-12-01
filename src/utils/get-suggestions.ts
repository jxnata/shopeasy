import { ExecutionMethod } from 'appwrite'

import { AI_DAY_LIMIT, ONE_DAY } from '../constants'
import { settings } from '../database'
import { functions } from '../lib/appwrite'

export const getSuggestions = async (items: string[]) => {
	try {
		let current = 0
		const ai_usage = settings.getNumber('ai_usage') || 0
		const last_usage = settings.getNumber('last_ai_usage') || 0
		current = ai_usage

		if (last_usage < Date.now() - ONE_DAY) {
			current = 0
			settings.set('ai_usage', 0)
		}

		if (current > AI_DAY_LIMIT) throw new Error('AI usage limit exceeded')

		const result = await functions.createExecution(
			'ai-suggestions',
			JSON.stringify({ items }),
			false,
			undefined,
			ExecutionMethod.POST
		)

		if (result.responseStatusCode !== 200) throw new Error(result.responseBody)

		const response: { suggestions: string[]; usage: number } = JSON.parse(result.responseBody)

		if (response.usage) {
			settings.set('ai_usage', current + response.usage)
			settings.set('last_ai_usage', Date.now())
		}

		return response.suggestions
	} catch {
		return []
	}
}
