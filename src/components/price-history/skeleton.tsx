import { View } from 'react-native'

import SkeletonBase from '../skeleton-base'

const Skeleton = () => (
	<View style={{ gap: 8, marginBottom: 16 }}>
		<SkeletonBase width='60%' height={16} />
		<SkeletonBase width='80%' height={12} />
		<SkeletonBase width='20%' height={10} />
	</View>
)

export default Skeleton
