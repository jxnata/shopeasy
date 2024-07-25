import React from 'react'
import { Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as S from './styles'

type Props = {
	open: boolean
	children: JSX.Element[]
	onClose: () => void
}

const Options = ({ open, children, onClose }: Props) => {
	const { bottom } = useSafeAreaInsets()

	return (
		<Modal animationType='fade' transparent visible={open} onRequestClose={onClose}>
			<S.Container onPress={onClose}>
				<S.Content style={{ paddingBottom: bottom }}>
					<S.Scroll>{children}</S.Scroll>
				</S.Content>
			</S.Container>
		</Modal>
	)
}

export default Options
