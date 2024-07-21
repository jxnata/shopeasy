import React from 'react'
import * as S from './styles'
import icons from '../../assets/data/icon-map.json'

const Icon = ({ name }: { name: keyof typeof icons }) => {
	return <S.Icon>{String.fromCodePoint(icons[name])}</S.Icon>
}

export default Icon
