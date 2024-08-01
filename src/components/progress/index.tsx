import React from 'react'

import * as S from './styles'

export const Progress = ({ percentage }: Props) => {
	return (
		<S.ProgressBar>
			<S.ProgressFill percentage={percentage} />
		</S.ProgressBar>
	)
}

type Props = {
	percentage: number
}
