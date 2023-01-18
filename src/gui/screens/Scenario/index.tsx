import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import * as Constants from '../../../constants';
import * as ScenarioFirestore from '../../../firebase/firestore/scenarioFirestore';
import useAnalyticsEventTracker from '../../../hooks/useAnalyticsEventTracker';
import * as Types from '../../../types';
import Button from '../../components/button';
import { ContentContainer } from '../../components/common';
import GameTags from '../../components/GameTags';
import Marginer from '../../components/marginer';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';
import StoreButtons from '../../components/StoreButtons';
import TextContent from '../../components/TextContent';

const ScenarioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ScenarioLogoImage = styled.div`
  flex: 1;
  padding: 5px;

  img {
    width: 350px;
    height: 350px;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.desktop}) {
    img {
      width: 300px;
      height: 300px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.laptop}) {
    img {
      width: 250px;
      height: 250px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXS}) {
    img {
      width: 100px;
      height: 100px;
    }
  }
`;

const Scenario = (): React.ReactElement => {
  const gaEventTracker = useAnalyticsEventTracker('Scenario');

  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [scenario, setScenario] = useState<Types.ScenarioDocument>();
  useEffect(() => {
    const locationSplit = location.pathname.split('/');
    if (locationSplit.length > 1) {
      const scenarioId = locationSplit[2];
      const unsubscribe = ScenarioFirestore.subscribeToScenario(scenarioId, (scenarioTmp) => {
        setScenario(scenarioTmp);
        setLoading(false);
      });

      if (unsubscribe !== undefined) {
        return unsubscribe;
      }
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1></h1>
            </ContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    );
  }

  if (scenario === undefined) {
    return (
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Ce scénario n&apos;existe pas.</h1>
            </ContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    );
  }

  return (
    <>
      {scenario.meta != null && (
        <Helmet>
          <title>{scenario.meta.title}</title>
          <meta name="description" content={scenario.meta.description} />
        </Helmet>
      )}
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>{scenario.title}</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <ScenarioContainer>
                <GameTags tags={scenario.tags} large={true} />
                <div className="fs-5" style={{ textAlign: 'justify' }}>
                  <TextContent>{scenario.description}</TextContent>
                </div>
                <ScenarioLogoImage>
                  <img src={scenario.logoUrl} alt={scenario.title + ' logo'} />
                </ScenarioLogoImage>
              </ScenarioContainer>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer coloredBackground>
            <Marginer direction="vertical" margin="1em" />
            <ContentContainer>
              <h2 className="text-center">
                Pour y jouer rien de plus simple, téléchargez l&apos;<b>application mobile</b> et
                sélectionnez le scénario :
              </h2>
              <StoreButtons />
              <h3 className="text-center">
                Prix d&apos;une partie :{' '}
                <span style={{ textDecoration: 'line-through' }}>{Constants.APP_GAME_COST}</span>{' '}
                <b>{Constants.WEBSITE_GAME_COST}</b> (
                {Constants.WEBSITE_TO_APP_GAME_REDUCTION_PERCENT}% de réduction en achetant
                directement sur le site) pour une <b>équipe</b> allant jusqu&apos;à 5 joueurs.
              </h3>
              <Link style={{ display: 'flex', flex: 1 }} to="/achat">
                <Button
                  style={{ flex: 1 }}
                  onClick={() => {
                    gaEventTracker('wish-to-buy');
                  }}>
                  Acheter un bon pour une partie d&apos;escape game
                </Button>
              </Link>
            </ContentContainer>
            <Marginer direction="vertical" margin="1em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </>
  );
};

export default Scenario;
