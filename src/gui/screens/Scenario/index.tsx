import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'


import * as Types from '../../../types';
import * as Firebase from '../../../firebase';
import { ContentContainer } from '../../components/common';
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer';
import TextContent from '../../components/TextContent';
import GameTags from '../../components/GameTags'
import StoreButtons from '../../components/StoreButtons'
import Marginer from '../../components/marginer'

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
`

const Title = styled.h1`
  color: #000;
  text-align: center;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 20px;
  }
`
const Subtitle = styled.h2`
  color: #000;
  text-align: center;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 18px;
  }
`

const Scenarios = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [scenario, setScenario] = useState<Types.ScenarioDocument>();
  useEffect(() => {
    const locationSplit = location.pathname.split("/");
    if (locationSplit.length > 1) {
      const scenarioId = locationSplit[2];
      const unsubscribe = Firebase.subscribeToScenario(scenarioId, scenarioTmp => {
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
      </PageContainer >
    )
  }

  if (scenario === undefined) {
    return (
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Ce scénario n'existe pas.</h1>
            </ContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer >
    )
  }

  return (
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
              <h3 style={{ textAlign: 'justify' }}><TextContent>{scenario.description}</TextContent></h3>
              <ScenarioLogoImage>
                <img src={scenario.logoUrl} alt={scenario.title + " logo"} />
              </ScenarioLogoImage>
            </ScenarioContainer>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer coloredBackground>
          <Marginer direction="vertical" margin="1em" />
          <Title>
            Pour y jouer rien de plus simple, téléchargez l'application et sélectionnez le scénario :
          </Title>
          <StoreButtons />
          <Subtitle>
            Prix d'une partie : 29.99€ pour 5 joueurs.
          </Subtitle>
          <Marginer direction="vertical" margin="1em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer >
  )
}

export default Scenarios


