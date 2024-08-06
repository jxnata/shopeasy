import { View } from 'react-native'

import SkeletonBase from '../skeleton-base'

const Skeleton = () => (
	<>
		{Array.from({ length: 5 }).map((_, i) => (
			<View style={{ gap: 8, marginBottom: 16 }} key={i}>
				<SkeletonBase width='40%' height={16} />
				<SkeletonBase width='80%' height={12} />
			</View>
		))}
	</>
)

export default Skeleton
