import React from 'react';
import styled from 'styled-components';

import * as Constants from '../../../constants';
import { ContentContainer } from '../../components/common';
import Marginer from '../../components/marginer';
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer';

import ActuNantes from '../../../assets/images/actuNantes.png';
import OceaneFM from '../../../assets/images/oceaneFM.png';
import Unidivers from '../../../assets/images/unidivers.png';
import OuestFrance from '../../../assets/images/ouest-france.png';

const Image = styled.img`
  width: 75%;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 5px solid black;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`;

const LongImage = styled(Image)`
  width: 50%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`;

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
`;

const TheyTalkAboutUs = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Ils parlent de nous</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <ContentContainer>
            <h3>Ouest-France - 28 mai 2022</h3>
            <a href={Constants.OUEST_FRANCE_28052022_URL}><LongImage src={OuestFrance} alt="Ouest-France" /></a>
          </ContentContainer>
          <ContentContainer>
            <RightSubContentContainer>
              <h3>Unidivers - 11 avril 2022</h3>
              <a href={Constants.UNIDIVERS_NANTES_11042022_URL}><Image src={Unidivers} alt="Unidivers" /></a>
            </RightSubContentContainer>
          </ContentContainer>
          <ContentContainer>
            <h3>Océane fm - 30 décembre 2021</h3>
            <a href={Constants.OCEANE_FM_30122021_URL}><Image src={OceaneFM} alt="OceaneFM" /></a>
          </ContentContainer>
          <ContentContainer>
            <RightSubContentContainer>
              <h3>ActuNantes - 15 décembre 2021</h3>
              <a href={Constants.ACTU_NANTES_15122021_URL}><Image src={ActuNantes} alt="ActuNantes" /></a>
            </RightSubContentContainer>
          </ContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default TheyTalkAboutUs
