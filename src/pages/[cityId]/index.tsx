import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
import styles from './index.module.scss'

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
        title: `Escape Games en Extérieur à ${city.name} - ShoesNotIncluded`,
        description: `Découvrez les scénarios d'escape game de ShoesNotIncluded de notre application mobile à ${city.name}. Jouez à plusieurs en extérieur. Téléchargez dès maintenant !`,
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Les scénarios disponibles à {city.name}</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <div className={styles.scenariosContainer}>
                {scenarios
                  .sort((a, b) => {
                    return a.data.ordre - b.data.ordre
                  })
                  .map((scenario) => {
                    return (
                      <Link className={styles.scenarioContainer} key={scenario.data.url}
                        href={cityId + '/' + scenario.data.url}
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
                          <div className={styles.scenarioLogoImage}>
                            <Image
                              src={scenario.data.logoUrl}
                              width={150}
                              height={150}
                              alt={scenario.id + ' logo'}
                            />
                          </div>
                          <div style={{ flex: 2 }}>
                            <GameTags tags={scenario.data.tags} />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </ContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export async function getStaticPaths() {
  const cities = await CityFirestore.getCities()

  const paths = cities.map((city) => {
    return {
      params: {
        cityId: city.id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { cityId: string }
}) {
  const cityId = params.cityId
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
