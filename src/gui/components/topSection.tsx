import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import LandingPageImg from '../../../public/images/landing-page.jpg'
import LogoImg from '../../../public/images/logo.png'
import Brand from './brand'
import Marginer from './marginer'
import styles from './topSection.module.scss'

const TopSectionContainer = styled.div`
  width: 100%;
  height: 800px;
`

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TopSectionInnerContainer = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5rem;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    height: 700px;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXS}) {
    height: 500px;
  }
`

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const SloganContainer = styled.div`
  filter: ${({ theme }) => theme.filter.default};
`

const LogoImage = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 400px;
    height: 400px;
    background-color: white;
    border-radius: 1000px;
    padding-top: 25px;
    padding-right: 35px;
    padding-bottom: 45px;
    padding-left: 35px;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    align-items: flex-end;
    img {
      width: 160px;
      height: 160px;
      padding-top: 10px;
      padding-right: 15px;
      padding-bottom: 20px;
      padding-left: 15px;
      margin-bottom: 15px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXS}) {
    align-items: flex-end;
    img {
      width: 130px;
      height: 130px;
      padding-top: 10px;
      padding-right: 15px;
      padding-bottom: 20px;
      padding-left: 15px;
    }
  }
`

const DesktopLogoImage = styled(LogoImage)`
  display: flex;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    display: none;
  }
`

const MobileLogoImage = styled(LogoImage)`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    display: flex;
  }
`

const BrandContainer = styled(Brand)`
  font-size: 50px;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 24px;
  }
`

const SloganText = styled.h3`
  margin: 0;
  line-height: 1.4;
  color: #000;
  font-family: 'Oxygen-Regular';
  font-weight: normal;
  font-size: 50px;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 24px;
  }
`

const SpecialText = styled.span`
  color: ${({ theme }) => theme.specialTextColor};
`

const TopSection = (): React.ReactElement => {
  return (
    <TopSectionContainer>
      <Image
        priority
        src={LandingPageImg}
        alt="People playing on the street at ShoesNotIncluded"
        className={styles.imageTopSection}
      />
      <BackgroundFilter>
        <TopSectionInnerContainer>
          <CenteredContainer>
            <MobileLogoImage>
              <Image
                priority
                src={LogoImg}
                alt="ShoesNotIncluded logo"
                width={400}
                height={400}
                style={{ zIndex: 1 }}
              />
            </MobileLogoImage>
            <SloganContainer>
              <BrandContainer withShadow={true} />
              <Marginer direction="vertical" margin={8} />
              <SloganText>L&apos;escape game plein air</SloganText>
              <SloganText>
                qui vous <SpecialText>rassemble</SpecialText>
              </SloganText>
              <Marginer direction="vertical" margin={15} />
            </SloganContainer>
          </CenteredContainer>
          <DesktopLogoImage>
            <Image
              priority
              src={LogoImg}
              alt="ShoesNotIncluded logo"
              width={400}
              height={400}
              style={{ zIndex: 1 }}
            />
          </DesktopLogoImage>
        </TopSectionInnerContainer>
      </BackgroundFilter>
    </TopSectionContainer>
  )
}

export default TopSection
