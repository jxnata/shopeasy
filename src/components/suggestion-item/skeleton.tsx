import { View } from 'react-native'

import SkeletonBase from '../skeleton-base'

const Skeleton = () => (
	<>
		{Array.from({ length: 1 }).map((_, i) => (
			<View
				style={{
					flexDirection: 'row',
					marginBottom: 12,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				key={i}
			>
				<SkeletonBase radius={8} width='100%' height={48} />
			</View>
		))}
	</>
)

export default Skeleton
