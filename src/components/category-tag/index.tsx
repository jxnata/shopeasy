import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { categoryName } from '../../utils/category-name'

const CategoryTag = ({ category }: Props) => {
	const { t } = useTranslation('translation', { keyPrefix: 'categories' })

	return (
		<S.CategoryContainer>
			<S.CategoryTag>
				<S.CategoryText>{t(categoryName(category))}</S.CategoryText>
			</S.CategoryTag>
		</S.CategoryContainer>
	)
}

export default CategoryTag

type Props = {
	category: number
}
