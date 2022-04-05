import React from 'react'
import { Link } from 'react-router-dom'

import * as Constants from '../../../constants';
import { ContentContainer, StyledLink } from '../../components/common';
import Marginer from '../../components/marginer'
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer'
import Button from '../../components/button'

const Prices = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Tarif d'une partie</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <ContentContainer>
            <h2 style={{ textAlign: 'center' }}><span style={{ textDecoration: 'line-through' }}>{Constants.APP_GAME_COST}</span> {Constants.WEBSITE_GAME_COST} ({Constants.WEBSITE_TO_APP_GAME_REDUCTION_PERCENT}% de réduction en achetant directement sur le site) pour une équipe allant jusqu'à 5 joueurs.</h2>
            <h3 style={{ textAlign: 'center' }}>Ce prix est bien pour tout le groupe : ici le nombre de joueurs n'influe pas sur le prix de la partie.</h3>
            <h4 style={{ textAlign: 'center' }}>Pour plus d'informations, visitez la <StyledLink to="/faq">FAQ</StyledLink>.</h4>
            <Link style={{ display: 'flex', flex: 1, marginTop: 25 }} to="/achat"><Button style={{ flex: 1 }}>Je souhaite acheter un bon pour une partie</Button></Link>
          </ContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default Prices
