import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, ScrollView } from 'react-native'
import { useAnimatedRef, useSharedValue } from 'react-native-reanimated'

import * as S from './styles'
import { Props } from './types'
import OnbarodingItem from '../../components/onboarding-item'
import Paginator from '../../components/paginator'
import Pressable from '../../components/shared/pressable'
import { Container } from '../../theme/global'

function Onboarding({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'onboarding' })
	const scrollX = useSharedValue(0)
	const [activeIndex, setActiveIndex] = useState(0)
	const scrollViewRef = useAnimatedRef<ScrollView>()

	const bouncyData = [
		{
			id: 1,
			title: t('feature_1_title'),
			description: t('feature_1_description'),
			image: require('../../assets/images/lists.png'),
		},
		{
			id: 2,
			title: t('feature_2_title'),
			description: t('feature_2_description'),

			image: require('../../assets/images/shop.png'),
		},
		{
			id: 3,
			title: t('feature_3_title'),
			description: t('feature_3_description'),
			image: require('../../assets/images/expenses.png'),
		},
		{
			id: 4,
			title: t('feature_4_title'),
			description: t('feature_4_description'),
			image: require('../../assets/images/notifications.png'),
		},
	]

	const handleScroll = (direction: 'left' | 'right') => {
		const newIndex = activeIndex + (direction === 'right' ? 1 : -1)
		if (newIndex >= 0 && newIndex < bouncyData.length) {
			setActiveIndex(newIndex)
			const newScrollX = (Dimensions.get('screen').width - 24) * newIndex
			scrollX.value = newScrollX
			setTimeout(() => {
				scrollViewRef.current?.scrollTo({
					x: newScrollX,
					y: 0,
					animated: true,
				})
			}, 400)
		}
	}

	const handleNextPress = () => {
		if (activeIndex === bouncyData.length - 1) return onComplete()
		handleScroll('right')
	}

	const handleBackPress = () => {
		handleScroll('left')
	}

	const onComplete = () => {
		navigation.navigate('permissions')
	}

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Head>
						<S.Button
							disabled={activeIndex === 0}
							title={t('back')}
							left='arrow-back'
							onPress={handleBackPress}
							variant='secondary'
						/>
						<S.Button
							title={t('next')}
							right='arrow-forward'
							onPress={handleNextPress}
							variant='secondary'
							disabled={activeIndex === bouncyData.length - 1}
						/>
					</S.Head>

					<ScrollView
						scrollEnabled={false}
						contentContainerStyle={{ alignItems: 'center' }}
						showsHorizontalScrollIndicator={false}
						pagingEnabled
						ref={scrollViewRef}
						scrollEventThrottle={16}
						horizontal
						style={{ flex: 1 }}
					>
						{bouncyData.map((item, index) => (
							<OnbarodingItem key={index} scrollX={scrollX} index={index} item={item} />
						))}
					</ScrollView>
					<S.Footer>
						<Paginator itemsLength={bouncyData.length} activeIndex={activeIndex} />
						<Pressable title={t('continue')} right='arrow-forward-outline' onPress={handleNextPress} />
					</S.Footer>
				</S.Content>
			</S.SafeAreaView>
		</Container>
	)
}

export default Onboarding
