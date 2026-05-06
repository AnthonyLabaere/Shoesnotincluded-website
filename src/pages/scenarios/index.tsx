import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Layout from '@/src/gui/components/layout'

import * as CityFirestore from '../../firebase/firestore/cityFirestore'
import { ContentContainer } from '../../gui/components/common'
import GameTags from '../../gui/components/GameTags'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import styles from './index.module.scss'
import * as Types from '../../types'

interface CitiesProps {
  staticCities: Types.CityDocument[]
}

const Cities = ({ staticCities }: CitiesProps): React.ReactElement => {
  const [cities, setCities] = useState<Types.CityDocument[]>(staticCities)
  useEffect(() => {
    return CityFirestore.subscribeToCities(setCities)
  }, [])

  return (
    <Layout
      meta={{
        title: 'Escape Games en Extérieur - ShoesNotIncluded',
        description:
          "Découvrez les scénarios d'escape game de ShoesNotIncluded de notre application mobile. Jouez à plusieurs en extérieur. Téléchargez dès maintenant !",
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Sélectionnez votre ville :</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <div className={styles.citiesContainer}>
                {cities
                  .sort((a, b) => {
                    return a.ordre - b.ordre
                  })
                  .map((city) => {
                    return (
                      <Link className={styles.cityContainer} key={city.id} href={'/' + city.id}>
                        <div
                          className="fs-3"
                          style={{ flex: 1, textAlign: 'center', padding: 5 }}
                        >
                          {city.name}
                        </div>
                        <div className={styles.cityLogoImage}>
                          <Image
                            src={city.imageUrl}
                            width={150}
                            height={150}
                            alt={city.id + ' logo'}
                          />
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

export async function getStaticProps() {
  const cities = await CityFirestore.getCities()
  return {
    props: {
      staticCities: cities.map((city) => city.data),
    },
  }
}

export default Cities
