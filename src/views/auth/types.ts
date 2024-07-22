import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { StackParamList } from '../../types/navigation/stack'

type ScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'auth'>

export type Props = {
	navigation: ScreenNavigationProp
}
