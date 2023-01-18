import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import * as Constants from '../../../constants';
import useAnalyticsEventTracker from '../../../hooks/useAnalyticsEventTracker';
import Button from '../../components/button';
import { ContentContainer, StyledLink } from '../../components/common';
import Marginer from '../../components/marginer';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';

const Prices = (): React.ReactElement => {
  const gaEventTracker = useAnalyticsEventTracker('Prices');

  return (
    <>
      <Helmet>
        <title>Tarifs Escape Game - 10% de réduction - ShoesNotIncluded</title>
        <meta
          name="description"
          content="Achetez vos bons d'escape game en extérieur avec ShoesNotIncluded et bénéficiez d'une réduction de 10%. Un seul achat suffit pour jouer jusqu'à 5 personnes."
        />
      </Helmet>
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Tarif d&apos;une partie</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <div className="fs-3 text-center">
                <span style={{ textDecoration: 'line-through' }}>{Constants.APP_GAME_COST}</span>{' '}
                <b>{Constants.WEBSITE_GAME_COST}</b> (
                {Constants.WEBSITE_TO_APP_GAME_REDUCTION_PERCENT}% de réduction en achetant
                directement sur le site) pour une équipe allant jusqu&apos;à 5 joueurs.
              </div>
              <br />
              <div className="fs-4 text-center">
                Ce prix est bien pour tout le groupe : ici le nombre de joueurs n&apos;influe pas
                sur le prix de la partie.
              </div>
              <br />
              <div className="fs-5 text-center">
                Pour plus d&apos;informations, visitez la <StyledLink to="/faq">FAQ</StyledLink>.
              </div>
              <Link style={{ display: 'flex', flex: 1, marginTop: 25 }} to="/achat">
                <Button
                  style={{ flex: 1 }}
                  onClick={() => {
                    gaEventTracker('wish-to-buy');
                  }}>
                  Je souhaite acheter un bon pour une partie
                </Button>
              </Link>
            </ContentContainer>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </>
  );
};

export default Prices;
