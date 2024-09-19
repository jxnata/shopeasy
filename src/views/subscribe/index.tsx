/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking } from 'react-native'
import Purchases, { PurchasesPackage } from 'react-native-purchases'

import * as S from './styles'
import { Props } from './types'
import Congratulations from '../../components/congratulations'
import Icon from '../../components/icon'
import Pressable from '../../components/shared/pressable'
import { toast } from '../../components/toast'
import { useSession } from '../../contexts/session'
import { Container, Label } from '../../theme/global'
import { getOfferings } from '../../utils/get-offerings'

function Subscribe({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'subscribe' })
	const [selectedOffering, setSelectedOffering] = useState<PurchasesPackage>()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const { checkPremium } = useSession()

	const onClose = () => {
		navigation.goBack()
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

			setLoading(true)

			await Purchases.purchaseStoreProduct(selectedOffering.product)

			toast.success(t('purchase_success'))

			setSuccess(true)

			checkPremium()
		} catch (e: unknown) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			if (!e.userCancelled) toast.error(t('purchase_error'))
		} finally {
			setLoading(false)
		}
	}

	const onRestore = async () => {
		try {
			setLoading(true)

			const restored = await Purchases.restorePurchases()

			if (Object.keys(restored.entitlements.active).length === 0) {
				throw new Error('No entitlements found')
			}

			toast.success(t('restore_success'))

			setSuccess(true)

			checkPremium()
		} catch {
			toast.error(t('restore_error'))
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (offerings.length > 0) setSelectedOffering(offerings[0])
	}, [offerings])

	const onOpenPrivacyPolicy = () => {
		Linking.openURL('https://jxnata.notion.site/Privacy-Policy-b4d7010d371244ac82b6d7befd71f141')
	}

	const onOpenTermsOfUse = () => {
		Linking.openURL('https://jxnata.notion.site/Terms-Conditions-7b6092d890ea4d8196fdedc763930f3b')
	}

	if (success) return <Congratulations />

	return (
		<Container>
			<S.SafeAreaView>
				<S.Content>
					<S.Body>
						<S.Head>
							<S.Logo source={require('../../assets/images/logo-premium.png')} />
						</S.Head>

						<S.Description>{t('description')}</S.Description>

						<S.FeatureList>
							<S.FeatureLine>
								<Icon name='megaphone' />
								<S.FeatureText>{t('feature1')}</S.FeatureText>
							</S.FeatureLine>
							<S.FeatureLine>
								<Icon name='notifications' />
								<S.FeatureText>{t('feature2')}</S.FeatureText>
							</S.FeatureLine>
							<S.FeatureLine>
								<Icon name='sparkles' />
								<S.FeatureText>{t('feature3')}</S.FeatureText>
							</S.FeatureLine>
							<S.FeatureLine>
								<Icon name='pie-chart' />
								<S.FeatureText>{t('feature4')}</S.FeatureText>
							</S.FeatureLine>
							<S.FeatureLine>
								<Icon name='diamond' />
								<S.FeatureText>{t('feature5')}</S.FeatureText>
							</S.FeatureLine>
						</S.FeatureList>
					</S.Body>

					<S.CloseButton onPress={onClose}>
						<Label>✕</Label>
					</S.CloseButton>

					<S.Offer>
						<S.TermsContainer>
							<S.RestoreButton onPress={onOpenPrivacyPolicy}>
								<S.RestoreText>{t('privacy_policy')}</S.RestoreText>
							</S.RestoreButton>
							<S.RestoreButton onPress={onOpenTermsOfUse}>
								<S.RestoreText>{t('terms_of_use')}</S.RestoreText>
							</S.RestoreButton>
						</S.TermsContainer>
						<S.OfferProducts>
							{offerings.map(offer => (
								<S.OfferButton
									aria-checked={selectedOffering && selectedOffering.identifier === offer.identifier}
									key={offer.identifier}
									onPress={() => setSelectedOffering(offer)}
								>
									<S.OfferTitleContainer>
										{selectedOffering && selectedOffering.identifier === offer.identifier && (
											<Icon name='checkmark-circle' />
										)}
										<S.OfferTitle>{t(offer.identifier)}</S.OfferTitle>
									</S.OfferTitleContainer>
									<S.OfferPrice>{offer.product.priceString}</S.OfferPrice>
									<S.OfferDescription>{offer.product.description}</S.OfferDescription>
								</S.OfferButton>
							))}
						</S.OfferProducts>
						<S.ButtonContainer>
							<Pressable
								onPress={onPurchase}
								disabled={loading}
								title={t('subscribe_button')}
								loading={loading}
							/>
							<S.RestoreButton onPress={onRestore} disabled={loading}>
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
