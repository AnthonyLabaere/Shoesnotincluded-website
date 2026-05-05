import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'
import useAppSelector from '@/src/hooks/useAppSelector'
import useCurrentUser from '@/src/hooks/useCurrentUser'
import { selectUser } from '@/src/store/userSlice'

import * as Constants from '../../constants'
import * as StripeFirestore from '../../firebase/firestore/stripeFirestore'
import Button from '../../gui/components/button'
import Checkbox from '../../gui/components/Checkbox'
import { ContentContainer, StyledLink } from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'

const PaymentText = styled.div`
  text-align: left;
`

const Payment = (): React.ReactElement => {
  const { userAuth } = useCurrentUser()

  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (user == null) {
      Router.push({
        pathname: '/compte',
        query: { achat: true },
      })
    }
  }, [user])

  const [loading, setLoading] = useState(false)
  const [checkoutSessionId, setCheckoutSessionId] = useState<string>()
  const [stripeUrl, setStripeUrl] = useState<string>()

  const createPayment = (): void => {
    if (userAuth !== undefined && userAuth !== null) {
      StripeFirestore.createPayment(userAuth.uid, setCheckoutSessionId)
    }
  }

  useEffect(() => {
    if (
      userAuth !== undefined &&
      userAuth !== null &&
      checkoutSessionId !== undefined
    ) {
      const unsubscribe = StripeFirestore.subscribeToCheckoutSession(
        userAuth.uid,
        checkoutSessionId,
        (checkoutSessionTmp) => {
          if (checkoutSessionTmp?.url !== undefined) {
            setCheckoutSessionId(undefined)
            setStripeUrl(checkoutSessionTmp.url)
          }
        }
      )

      return unsubscribe
    }
  }, [userAuth, checkoutSessionId])

  useEffect(() => {
    if (stripeUrl !== undefined) {
      // Redirection vers stripe
      window.location.href = stripeUrl
    }
  }, [stripeUrl])

  const [consent, setConsent] = useState(false)
  const [tryWithoutVerifiedUser, setTryWithoutVerifiedUser] = useState(false)
  const [tryWithoutConsent, setTryWithoutConsent] = useState(false)

  return (
    <Layout
      meta={{
        title: 'Escape Game - 10% de réduction - ShoesNotIncluded',
        description:
          "Achetez un bon pour une partie d'escape game en extérieur avec ShoesNotIncluded, utilisable pour soi ou en cadeau, avec une réduction de 10%.",
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Achat d&apos;une partie</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <Marginer direction="vertical" margin="2em" />
              <PaymentText className="fs-5">
                Cet achat vous donnera accès à un bon pour une partie
                ShoesNotIncluded.
                <ul>
                  <li>Compatible avec tous les scénarios.</li>
                  <li>Permet de jouer jusqu&apos;à 5 joueurs simultanés.</li>
                  <li>Peut être utilisé pour soi ou offert en cadeau 🎁.</li>
                  <li>N&apos;a pas de date de fin de validité 📆.</li>
                  <li>
                    Prix réduit de 10% par rapport à un achat sur
                    l&apos;application mobile.
                  </li>
                </ul>
                ❗ Attention, ce bon d&apos;achat est uniquement activable sur{' '}
                <u>Android</u>. La politique de vente d&apos;Apple ne nous
                permet pas de vous faire profiter de cette réduction. Vous
                pouvez quand même en profiter{' '}
                <u>si au moins l&apos;un des membres</u> de votre équipe possède
                un Android.
              </PaymentText>
              <PaymentText className="fs-5 mt-4">
                <Checkbox
                  id="consent"
                  label={
                    <>
                      {' '}
                      J&apos;accepte les{' '}
                      <StyledLink href="/cgu-cgv">
                        conditions générales de ventes
                      </StyledLink>
                    </>
                  }
                  value={consent}
                  onChange={setConsent}
                />
              </PaymentText>
              <div style={{ display: 'flex', flex: 1 }}>
                <Button
                  style={{ flex: 1 }}
                  disabled={
                    userAuth === undefined || userAuth === null || loading
                  }
                  onClick={() => {
                    if (userAuth !== undefined && userAuth !== null) {
                      if (!userAuth.emailVerified) {
                        setTryWithoutVerifiedUser(true)
                      } else {
                        setTryWithoutVerifiedUser(false)
                        if (consent) {
                          setTryWithoutConsent(false)
                          setLoading(true)
                          createPayment()
                        } else {
                          setTryWithoutConsent(true)
                        }
                      }
                    }
                  }}
                >
                  {!loading
                    ? 'Acheter un bon pour une partie à ' +
                      Constants.WEBSITE_GAME_COST
                    : 'Redirection vers le site partenaire en cours, merci de patienter...'}
                </Button>
              </div>
              {tryWithoutVerifiedUser && (
                <PaymentText
                  className="fs-5"
                  style={{ color: Constants.THEME_RED_COLORS[0] }}
                >
                  Veuillez terminer votre inscription en cliquant sur le lien
                  fourni par mail, puis rafraîchissez la page.
                </PaymentText>
              )}
              {tryWithoutConsent && (
                <PaymentText
                  className="fs-5"
                  style={{ color: Constants.THEME_RED_COLORS[0] }}
                >
                  Veuillez accepter les conditions générales de vente.
                </PaymentText>
              )}
              <PaymentText className="fs-5">
                Pour utiliser le bon d&apos;achat, veuillez vous référer à la
                section &quot;Comment utiliser un bon d&apos;achat ?&quot; de la{' '}
                <StyledLink href="/faq">FAQ</StyledLink>.
                <br />
              </PaymentText>
              <br />
              <i className="fs-6">
                Précision : les bons d&apos;achat ne sont pour l&apos;instant
                pas visibles dans l&apos;historique de l&apos;application
                mobile.
              </i>
            </ContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default Payment
