import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as Types from '../../../types'
import * as CityFirestore from '../../../firebase/firestore/cityFirestore'
import * as ScenarioFirestore from '../../../firebase/firestore/scenarioFirestore'
import { ContentContainer } from '../../components/common'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer'
import GameTags from '../../components/GameTags'

const ScenariosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ScenarioContainer = styled(Link)`
  display: flex;
  flex-direction: column;

  min-width: 30%;
  max-width: 30%;

  margin: 15px;
  padding: 15px;

  border: 1px solid black;
  border-radius: 15px;

  cursor: pointer;
  color: black;

  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    min-width: 95%;
    max-width: 95%;
  }

  :hover {
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

const ScenarioLogoImage = styled.div`
  flex: 1;
  padding: 5px;

  img {
      width: 150px;
      height: 150px;
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
    CityFirestore.subscribeToCities(setCities);
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
    return ScenarioFirestore.subscribeToScenariosFromCity(cityId, setScenarios);
  }, [cityId]);

  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            {/* FIXME : à changer une fois la sélection de la ville rendue possible */}
            <h1>Les scénarios disponibles à {city !== undefined ? city.name : "Nantes"}</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <ContentContainer>
            <ScenariosContainer>
              {
                scenarios
                  .filter(scenario => scenario.data.secret !== true)
                  .sort((a, b) => {
                    return a.data.ordre - b.data.ordre;
                  }).map(scenario => {
                    return (
                      <ScenarioContainer key={scenario.id} to={"/scenario/" + scenario.id}>
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


