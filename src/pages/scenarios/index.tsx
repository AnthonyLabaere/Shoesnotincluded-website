import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import * as CityFirestore from '../../firebase/firestore/cityFirestore'
import { ContentContainer } from '../../gui/components/common'
import GameTags from '../../gui/components/GameTags'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import * as Types from '../../types'

const CitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const CityContainer = styled(Link)`
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

const CityLogoImage = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;

  img {
    width: 250px;
    height: 250px;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXS}) {
    img {
      width: 175px;
      height: 175px;
    }
  }
`

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
              <CitiesContainer>
                {cities
                  .sort((a, b) => {
                    return a.ordre - b.ordre
                  })
                  .map((city) => {
                    return (
                      <CityContainer key={city.id} href={'/' + city.id}>
                        <div
                          className="fs-3"
                          style={{ flex: 1, textAlign: 'center', padding: 5 }}
                        >
                          {city.name}
                        </div>
                        <CityLogoImage>
                          <Image
                            src={city.imageUrl}
                            width={150}
                            height={150}
                            alt={city.id + ' logo'}
                          />
                        </CityLogoImage>
                      </CityContainer>
                    )
                  })}
              </CitiesContainer>
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
