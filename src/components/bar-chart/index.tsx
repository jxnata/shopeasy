import React from 'react'
import { ScrollView } from 'react-native'

import * as S from './styles'
import { format } from '../../utils/format'

const BarChart: React.FC<Props> = ({ data, maxHeight = 200 }) => {
	const maxValue = Math.max(...data.map(item => item.value))

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{data.map((item, index) => (
				<S.BarContainer key={index}>
					<S.LabelPrice>{format(item.value)}</S.LabelPrice>
					<S.Bar style={{ height: (item.value / maxValue) * maxHeight }} />
					<S.LabelDate>{item.label}</S.LabelDate>
				</S.BarContainer>
			))}
		</ScrollView>
	)
}

export default BarChart

type Props = {
	data: { label: string; value: number }[]
	maxHeight?: number
}
