import Link from 'next/link'
import React from 'react'

import Layout from '@/src/gui/components/layout'

import * as Constants from '../../constants'
import Button from '../../gui/components/button'
import { ContentContainer, StyledLink } from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker'

const Prices = (): React.ReactElement => {
  const gaEventTracker = useAnalyticsEventTracker('Prices')

  return (
    <Layout
      meta={{
        title: 'Tarifs Escape Game - 10% de réduction - ShoesNotIncluded',
        description:
          "Achetez vos bons d'escape game en extérieur avec ShoesNotIncluded et bénéficiez d'une réduction de 10%. Un seul achat suffit pour jouer jusqu'à 5 personnes.",
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Tarif d&apos;une partie d&apos;escape game</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <div className="fs-3 text-center">
                <span style={{ textDecoration: 'line-through' }}>
                  {Constants.APP_GAME_COST}
                </span>{' '}
                <b>{Constants.WEBSITE_GAME_COST}</b> (
                {Constants.WEBSITE_TO_APP_GAME_REDUCTION_PERCENT}% de réduction
                en achetant directement sur le site) pour une équipe allant
                jusqu&apos;à 5 joueurs.
              </div>
              <br />
              <div className="fs-4 text-center">
                Ce prix est bien pour tout le groupe : ici le nombre de joueurs
                n&apos;influe pas sur le prix de la partie.
              </div>
              <br />
              <div className="fs-5 text-center">
                Pour plus d&apos;informations, visitez la{' '}
                <StyledLink href="/faq">FAQ</StyledLink>.
              </div>
              <Link
                style={{ display: 'flex', flex: 1, marginTop: 25 }}
                href="/achat"
              >
                <Button
                  style={{ flex: 1 }}
                  onClick={() => {
                    gaEventTracker('wish-to-buy')
                  }}
                >
                  Acheter un bon pour une partie d&apos;escape game
                </Button>
              </Link>
            </ContentContainer>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default Prices
