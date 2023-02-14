import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import ActuNantes from '../../../public/images/actuNantes.png'
import NantesEtVousTV from '../../../public/images/nantes-et-vous-tv.png'
import OceaneFM from '../../../public/images/oceaneFM.png'
import OuestFrance from '../../../public/images/ouest-france.png'
import SortiesANantes from '../../../public/images/sorties-a-nantes-20220818.png'
import Unidivers from '../../../public/images/unidivers.png'
import * as Constants from '../../constants'
import { ContentContainer } from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'

const ShortImage = styled(Image)`
  width: 75%;
  height: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 5px solid black;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`

const LongImage = styled(ShortImage)`
  width: 50%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`

const RightSubContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  a > img {
    float: right;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    align-items: flex-start;

    a > img {
      float: left;
    }
  }
`

const TheyTalkAboutUs = (): React.ReactElement => {
  return (
    <Layout
      meta={{
        title: 'Escape Game - Ils parlent de nous - ShoesNotIncluded',
        description:
          "Retrouvez les articles et les interviews concernant ShoesNotIncluded et son concept d'escape game en extérieur sur notre page de presse.",
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Ils parlent de nous</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <div className="fs-4">NANTES&VOUSTV - 30 août 2022</div>
              <a href={Constants.NANTES_ET_VOUS_TV_URL}>
                <LongImage src={NantesEtVousTV} alt="NANTESETVOUSTV" />
              </a>
            </ContentContainer>
            <ContentContainer>
              <RightSubContentContainer>
                <div className="fs-4">Sorties à Nantes - 22 août 2022</div>
                <a href={Constants.SORTIES_A_NANTES_18082022_URL}>
                  <LongImage
                    src={SortiesANantes}
                    alt="Sorties-A-Nantes-20220818"
                  />
                </a>
              </RightSubContentContainer>
            </ContentContainer>
            <ContentContainer>
              <div className="fs-4">Ouest-France - 28 mai 2022</div>
              <a href={Constants.OUEST_FRANCE_28052022_URL}>
                <LongImage src={OuestFrance} alt="Ouest-France" />
              </a>
            </ContentContainer>
            <ContentContainer>
              <RightSubContentContainer>
                <div className="fs-4">Unidivers - 11 avril 2022</div>
                <a href={Constants.UNIDIVERS_NANTES_11042022_URL}>
                  <ShortImage src={Unidivers} alt="Unidivers" />
                </a>
              </RightSubContentContainer>
            </ContentContainer>
            <ContentContainer>
              <div className="fs-4">Océane fm - 30 décembre 2021</div>
              <a href={Constants.OCEANE_FM_30122021_URL}>
                <ShortImage src={OceaneFM} alt="OceaneFM" />
              </a>
            </ContentContainer>
            <ContentContainer>
              <RightSubContentContainer>
                <div className="fs-4">ActuNantes - 15 décembre 2021</div>
                <a href={Constants.ACTU_NANTES_15122021_URL}>
                  <ShortImage src={ActuNantes} alt="ActuNantes" />
                </a>
              </RightSubContentContainer>
            </ContentContainer>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default TheyTalkAboutUs
