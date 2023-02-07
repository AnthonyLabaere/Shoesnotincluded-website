import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

import LandingPageImg from '../../../public/images/landing-page.jpg'
import LogoImg from '../../../public/images/logo.png'
import { DEVICE_SIZES } from '../../constants'
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

const LogoContainer = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  filter: ${({ theme }) => theme.filter.default};
`

const LogoImage = styled.div`
  display: flex;
  flex: 1;
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
  const isMobile = useMediaQuery({ maxWidth: DEVICE_SIZES.mobileXL })

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
          <LogoContainer>
            {isMobile && (
              <LogoImage>
                <Image
                  priority
                  src={LogoImg}
                  alt="ShoesNotIncluded logo"
                  width={400}
                  height={400}
                  style={{ zIndex: 1 }}
                />
              </LogoImage>
            )}
            <BrandContainer withShadow={true} />
            <Marginer direction="vertical" margin={8} />
            <SloganText>L&apos;escape game plein air</SloganText>
            <SloganText>
              qui vous <SpecialText>rassemble</SpecialText>
            </SloganText>
            <Marginer direction="vertical" margin={15} />
          </LogoContainer>
          {!isMobile && (
            <LogoImage>
              <Image
                priority
                src={LogoImg}
                alt="ShoesNotIncluded logo"
                width={400}
                height={400}
                style={{ zIndex: 1 }}
              />
            </LogoImage>
          )}
        </TopSectionInnerContainer>
      </BackgroundFilter>
    </TopSectionContainer>
  )
}

export default TopSection
