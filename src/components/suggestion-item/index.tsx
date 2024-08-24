import trim from 'lodash/trim'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Skeleton from './skeleton'
import * as S from './styles'

const SuggestionItem = ({ item, onAccept, onRemove }: Props) => {
	const { t } = useTranslation('translation', { keyPrefix: 'item' })

	const handleAccept = () => {
		onAccept(trim(item))
	}

	const handleRemove = () => {
		onRemove(trim(item))
	}

	return (
		<S.Container>
			<S.Text>{item}</S.Text>
			<S.Buttons>
				<S.Accept onPress={handleAccept}>
					<S.AcceptText>{t('accept')}</S.AcceptText>
				</S.Accept>
				<S.Remove onPress={handleAccept}>
					<S.RemoveIcon name='close' onPress={handleRemove} />
				</S.Remove>
			</S.Buttons>
		</S.Container>
	)
}

export default SuggestionItem

export const SuggestionSkeleton = () => <Skeleton />

type Props = {
	item: string
	onAccept: (item: string) => void
	onRemove: (item: string) => void
}
