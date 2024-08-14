import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { StackParamList } from '../../types/navigation/stack'

type ScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'permissions'>

export type Props = {
	navigation: ScreenNavigationProp
}
