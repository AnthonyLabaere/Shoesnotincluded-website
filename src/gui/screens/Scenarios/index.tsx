import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import * as Types from '../../../types'
import * as Firebase from '../../../firebase'
import { ContentContainer } from '../../components/common'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer'
import GameTags from './GameTags'

const ScenariosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ScenarioContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 30%;
  max-width: 30%;

  margin: 15px;
  padding: 15px;

  border: 1px solid black;
  border-radius: 15px;

  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    min-width: 95%;
    max-width: 95%;
  }
`;

const ScenarioLogoImage = styled.div`
  flex: 1;
  padding: 5px;

  img {
    max-width: 150px;
    max-height: 150px;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXS}) {
    img {
      width: 100px;
      height: 100px;
    }
  }
`

const Scenarios = () => {
  // TODO : mettre une page intermédiaire avec sélection de sa ville lorsque d'autres villes seront concernées
  const [cities, setCities] = useState<Types.CityDocument[]>([])
  // console.debug("cities", cities)
  useEffect(() => {
    return Firebase.subscribeToCities(setCities);
  }, []);

  const cityId = "nantes";

  const [city, setCity] = useState<Types.CityDocument>()
  useEffect(() => {
    if (cities.length > 0) {
      setCity(cities.find(city => city.id = cityId) as Types.CityDocument);
    }
  }, [cities, cityId]);


  const [scenarios, setScenarios] = useState<Types.ScenarioSnapshot[]>([])
  console.debug(scenarios)
  useEffect(() => {
    return Firebase.subscribeToScenariosFromCity(cityId, setScenarios);
  }, [cityId]);

  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            {
              city !== undefined ? <h1>Les scénarios disponibles à {city.name}</h1> : <h1 />
            }
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <ContentContainer>
            <ScenariosContainer>
              {
                scenarios.sort((a, b) => {
                  return a.data.ordre - b.data.ordre;
                }).map(scenario => {
                  return (
                    <ScenarioContainer key={scenario.id}>
                      <h2 style={{ flex: 1, textAlign: 'center', padding: 5 }}>{scenario.data.title}</h2>
                      <div style={{ display: 'flex', flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ScenarioLogoImage>
                          <img src={scenario.data.logoUrl} alt={scenario.id + " logo"} />
                        </ScenarioLogoImage>
                        <div style={{ flex: 2 }}>
                          <GameTags tags={scenario.data.tags} />
                        </div>
                      </div>
                    </ScenarioContainer>
                  )
                })
              }
            </ScenariosContainer>
          </ContentContainer>
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer >
  )
}

export default Scenarios

