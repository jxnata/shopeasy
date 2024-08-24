import { ExecutionMethod } from 'appwrite'

import { functions } from '../lib/appwrite'

export const getSuggestions = async (items: string[]) => {
	try {
		const result = await functions.createExecution(
			'ai-suggestions',
			JSON.stringify({ items }),
			false,
			undefined,
			ExecutionMethod.POST
		)

		if (result.responseStatusCode !== 200) throw new Error(result.responseBody)

		const suggestions: string[] = JSON.parse(result.responseBody)

		return suggestions
	} catch {
		return []
	}
}
