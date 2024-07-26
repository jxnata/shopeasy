import React from 'react'
import { Text, TextInputProps, useColorScheme } from 'react-native'

import icons from '../../assets/data/icon-map.json'
import theme from '../../theme'

const Icon = (props: TextInputProps & { name: keyof typeof icons }) => {
	const scheme = useColorScheme()
	const colors = theme[scheme!]

	return (
		<Text style={{ fontFamily: 'Ionicons', fontSize: 16, color: colors.foreground }} {...props}>
			{String.fromCodePoint(icons[props.name])}
		</Text>
	)
}

export default Icon
