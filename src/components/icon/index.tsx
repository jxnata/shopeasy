import React from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styles'
import icons from '../../assets/data/icon-map.json'

const Icon = (props: TextInputProps & { name: keyof typeof icons }) => {
	return <S.Icon {...props}>{String.fromCodePoint(icons[props.name])}</S.Icon>
}

export default Icon
