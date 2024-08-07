import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Purchases, { PurchasesPackage } from 'react-native-purchases'

import * as S from './styles'
import { Props } from './types'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { settings } from '../../database'
import { Button, ButtonLabel, Container, Label } from '../../theme/global'
import { getOfferings } from '../../utils/get-offerings'

function Subscribe({ navigation, route }: Props) {
	const back = route.params ? route.params.back : false

	const { t } = useTranslation('translation', { keyPrefix: 'subscribe' })
	const [selectedOffering, setSelectedOffering] = useState<PurchasesPackage>()
	const { checkPremium } = useSession()

	const onClose = () => {
		settings.set('initialized', true)
		try {
			if (back) return navigation.goBack()

			navigation.replace('home')
		} catch {}
	}

	const { data: offerings } = useQuery<PurchasesPackage[]>({
		queryKey: ['iap-offerings'],
		enabled: true,
		initialData: [],
		queryFn: async () => getOfferings(),
	})

	const onPurchase = async () => {
		try {
			if (!selectedOffering) return

			await Purchases.purchaseStoreProduct(selectedOffering.product)

			toast.success(t('purchase_success'))

			checkPremium()

			if (back) return navigation.goBack()

			navigation.replace('home')
		} catch (e: unknown) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			if (!e.userCancelled) toast.error(t('purchase_error'))
		}
	}

	const onRestore = async () => {
		try {
			await Purchases.restorePurchases()

			toast.success(t('restore_success'))

			checkPremium()

			if (back) return navigation.goBack()

			navigation.replace('home')
		} catch {
			toast.error(t('restore_error'))
		}
	}

	useEffect(() => {
		if (offerings.length > 0) setSelectedOffering(offerings[offerings.length - 1])
	}, [offerings])

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Body>
						<S.Head>
							<S.Logo resizeMode='contain' />
							<S.EmojiList>🛒🍎🍍🥩🍊🍔🥦✅</S.EmojiList>
						</S.Head>

						<S.Description>{t('description')}</S.Description>

						<S.FeatureList>
							<S.FeatureText>{t('feature1')}</S.FeatureText>
							<S.FeatureText>{t('feature2')}</S.FeatureText>
							<S.FeatureText>{t('feature3')}</S.FeatureText>
							<S.FeatureText>{t('feature4')}</S.FeatureText>
							<S.FeatureText>{t('feature5')}</S.FeatureText>
						</S.FeatureList>
					</S.Body>

					<S.CloseButton onPress={onClose}>
						<Label>✕</Label>
					</S.CloseButton>

					<S.Offer>
						{offerings.map(offer => (
							<S.OfferButton
								aria-checked={selectedOffering && selectedOffering.identifier === offer.identifier}
								key={offer.identifier}
								onPress={() => setSelectedOffering(offer)}
							>
								<S.OfferTitle>{t(offer.identifier)}</S.OfferTitle>
								<S.OfferDescription>
									{t('subscribe_description')} {offer.product.priceString}/{t(offer.packageType)}
								</S.OfferDescription>
								{offer.identifier === '$rc_annual' && (
									<S.OfferBadge>
										<S.OfferBadgeText>16% OFF</S.OfferBadgeText>
									</S.OfferBadge>
								)}
							</S.OfferButton>
						))}
						<S.ButtonContainer>
							<Button onPress={onPurchase}>
								<ButtonLabel>{t('subscribe_button')}</ButtonLabel>
							</Button>
							<S.RestoreButton onPress={onRestore}>
								<S.RestoreText>{t('restore_button')}</S.RestoreText>
							</S.RestoreButton>
						</S.ButtonContainer>
					</S.Offer>
				</S.Content>
			</S.SafeAreaView>
		</Container>
	)
}

export default Subscribe
