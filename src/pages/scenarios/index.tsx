import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import * as CityFirestore from '../../firebase/firestore/cityFirestore'
import * as ScenarioFirestore from '../../firebase/firestore/scenarioFirestore'
import { ContentContainer } from '../../gui/components/common'
import GameTags from '../../gui/components/GameTags'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import * as Types from '../../types'

const ScenariosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

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
`

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

interface ScenariosProps {
  cityId: string
  staticCity: Types.CityDocument
  staticScenarios: Types.ScenarioSnapshot[]
}

const Scenarios = ({
  cityId,
  staticCity,
  staticScenarios,
}: ScenariosProps): React.ReactElement => {
  // TODO : mettre une page intermédiaire avec sélection de sa ville lorsque d'autres villes seront concernées
  // const [cities, setCities] = useState<Types.CityDocument[]>([])
  // console.debug("cities", cities)
  // useEffect(() => {
  //   return CityFirestore.subscribeToCities(setCities)
  // }, [])

  const [city, setCity] = useState<Types.CityDocument>(staticCity)
  useEffect(() => {
    return CityFirestore.subscribeToCity(cityId, (cityTmp) => {
      if (cityTmp !== undefined) {
        setCity(cityTmp)
      }
    })
  }, [cityId])

  const [scenarios, setScenarios] =
    useState<Types.ScenarioSnapshot[]>(staticScenarios)
  useEffect(() => {
    return ScenarioFirestore.subscribeToScenariosFromCity(cityId, setScenarios)
  }, [cityId])

  return (
    <Layout
      meta={{
        title: 'Escape Games en Extérieur à Nantes - ShoesNotIncluded',
        description:
          "Découvrez les scénarios d'escape game de ShoesNotIncluded de notre application mobile à Nantes. Jouez à plusieurs en extérieur. Téléchargez dès maintenant !",
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              {/* FIXME : à changer une fois la sélection de la ville rendue possible */}
              <h1>Les scénarios disponibles à {city.name}</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <ScenariosContainer>
                {scenarios
                  .sort((a, b) => {
                    return a.data.ordre - b.data.ordre
                  })
                  .map((scenario) => {
                    return (
                      <ScenarioContainer
                        key={scenario.id}
                        href={'/scenario/' + scenario.id}
                      >
                        <div
                          className="fs-3"
                          style={{ flex: 1, textAlign: 'center', padding: 5 }}
                        >
                          {scenario.data.title}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flex: 3,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ScenarioLogoImage>
                            <Image
                              src={scenario.data.logoUrl}
                              width={150}
                              height={150}
                              alt={scenario.id + ' logo'}
                            />
                          </ScenarioLogoImage>
                          <div style={{ flex: 2 }}>
                            <GameTags tags={scenario.data.tags} />
                          </div>
                        </div>
                      </ScenarioContainer>
                    )
                  })}
              </ScenariosContainer>
            </ContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

// TODO : ajouter la ville en param quand d'autres villes auront des scénarios
export async function getStaticProps() {
  const cityId = 'nantes'

  const city = await CityFirestore.getCity(cityId)

  const scenarios = await ScenarioFirestore.getScenariosFromCity(cityId)

  return {
    props: {
      cityId,
      staticCity: city,
      staticScenarios: scenarios,
    },
  }
}

export default Scenarios
