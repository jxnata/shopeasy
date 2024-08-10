import React from 'react'
import { ScrollView } from 'react-native'

import * as S from './styles'

type BarChartProps = {
	data: { label: string; value: number }[]
	barColor?: string
	barWidth?: number
	maxHeight?: number
}

const BarChart: React.FC<BarChartProps> = ({ data, barColor = '#3498db', barWidth = 30, maxHeight = 200 }) => {
	const maxValue = Math.max(...data.map(item => item.value))

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{data.map((item, index) => (
				<S.BarContainer key={index}>
					<S.Bar
						style={{
							height: (item.value / maxValue) * maxHeight,
							backgroundColor: barColor,
							width: barWidth,
						}}
					/>
					<S.Label>{item.label}</S.Label>
				</S.BarContainer>
			))}
		</ScrollView>
	)
}

export default BarChart
