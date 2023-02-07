import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

import { DEVICE_SIZES, SOCIAL_NETWORKS_URLS } from '../../constants'
import { StyledLink } from '../components/common'
import Brand from './brand'
import Marginer from './marginer'

const GREY_COLOR = '#353535'
const GREY_HOVER_COLOR = '#666666'

const FooterContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 3rem;
  border-top: 0.6px solid rgb(0, 0, 0, 0.3);

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    padding: 2rem 0.75rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXS}) {
    padding: 2rem 0.5rem;
  }

  padding-bottom: 0;
`

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`

const TopContentContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.deviceSizes.laptop};
`

const ContentContainer = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    flex-direction: column;
  }
`

const BottomContainer = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  border-top: 0.6px solid rgb(0, 0, 0, 0.3);
  padding: 0 10px;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    padding: 0;
  }
`

const TopSubContainer = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1rem;
  margin-right: 1rem;
  text-align: justify;
  align-items: center;
`

const Title = styled.h2`
  margin: 0;
  margin-bottom: 13px;
  color: #000;
  font-weight: 600;
  font-size: 20px;
`

const SocialIconContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const SocialIcon = styled.div`
  color: ${GREY_COLOR};
  font-size: 45px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color, 200ms ease-in-out;

  &:hover {
    color: ${GREY_HOVER_COLOR};
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 25px;
  }
`

const BottomSubContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BottomSubContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PrivacyText = styled.div`
  color: ${GREY_COLOR};
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  display: inline;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 0.5rem;
  }
`

const BottomStyledLink = styled(StyledLink)`
  color: ${GREY_COLOR};
  font-size: 1.25rem;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${GREY_HOVER_COLOR};
  }
`

const Footer = (): React.ReactElement => {
  const isMobileXS = useMediaQuery({ maxWidth: DEVICE_SIZES.mobileXS })
  const isMobile = useMediaQuery({ maxWidth: DEVICE_SIZES.mobileXL })

  let marginerMargin: number
  if (isMobileXS) {
    marginerMargin = 5
  } else if (isMobile) {
    marginerMargin = 7.5
  } else {
    marginerMargin = 10
  }

  return (
    <FooterContainer>
      <TopContainer>
        <TopContentContainer>
          <ContentContainer>
            <TopSubContainer>
              <Title>À propos</Title>
              <p>
                ShoesNotIncluded est une application mobile multijoueur
                reprenant les codes de l&apos;escape game mais en plein air. Les
                jeux vous proposent de vous déplacer dans des quartiers, de
                fouiller l&apos;environnement à la recherche d&apos;indices et
                d&apos;y résoudre des énigmes. L&apos;application permet de
                jouer seul mais aussi à plusieurs.
              </p>
            </TopSubContainer>
            <TopSubContainer>
              <Title>Où jouer ?</Title>
              <p>
                Plusieurs scénarios sont disponibles à Nantes et d&apos;autres
                sont en cours de création. N&apos;hésitez pas à nous suivre sur
                les réseaux sociaux pour ne pas rater les évènements à venir.
              </p>
            </TopSubContainer>
          </ContentContainer>
          <ContentContainer>
            <TopSubContainer>
              <Title>Suivez-nous sur les réseaux sociaux :</Title>
              <SocialIconContainer>
                <a href={SOCIAL_NETWORKS_URLS.facebook} title="Facebook">
                  <SocialIcon>
                    <FontAwesomeIcon icon={faFacebook} fontSize={45} />
                  </SocialIcon>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href={SOCIAL_NETWORKS_URLS.linkedin} title="Linkedin">
                  <SocialIcon>
                    <FontAwesomeIcon icon={faLinkedinIn} fontSize={45} />
                  </SocialIcon>
                  <span className="sr-only">Linkedin</span>
                </a>
                <a href={SOCIAL_NETWORKS_URLS.instagram} title="Instagram">
                  <SocialIcon>
                    <FontAwesomeIcon icon={faInstagram} fontSize={45} />
                  </SocialIcon>
                  <span className="sr-only">Instagram</span>
                </a>
              </SocialIconContainer>
            </TopSubContainer>
          </ContentContainer>
          <Marginer direction="vertical" margin={25} />
          <ContentContainer>
            <TopSubContainer>
              <BottomStyledLink href="/ils-parlent-de-nous" prefetch={false}>
                Ils parlent de nous.
              </BottomStyledLink>
            </TopSubContainer>
          </ContentContainer>
          <Marginer direction="vertical" margin={25} />
          <ContentContainer>
            <TopSubContainer>
              <BottomStyledLink href="/contact" prefetch={false}>
                Nous contacter
              </BottomStyledLink>
            </TopSubContainer>
          </ContentContainer>
        </TopContentContainer>
      </TopContainer>

      <BottomContainer>
        <BottomSubContainerColumn>
          <BottomStyledLink href="/">
            <Brand
              className="fs-6"
              color={GREY_COLOR}
              hoverColor={GREY_HOVER_COLOR}
            />
          </BottomStyledLink>
          <PrivacyText> Marque déposée. 2021</PrivacyText>
        </BottomSubContainerColumn>

        <BottomSubContainerRow>
          <BottomStyledLink href="/mentions-legales" prefetch={false}>
            Mentions légales
          </BottomStyledLink>
          <Marginer direction="horizontal" margin={marginerMargin} />
          <BottomStyledLink href="/cgu-cgv" prefetch={false}>
            {isMobile
              ? 'CGU & CGV'
              : "Condition générales d'utilisation et de vente"}
          </BottomStyledLink>
          <Marginer direction="horizontal" margin={marginerMargin} />
          <BottomStyledLink href="/confidentialite" prefetch={false}>
            {isMobile ? 'Confidentialité' : 'Politique de confidentialité'}
          </BottomStyledLink>
        </BottomSubContainerRow>
      </BottomContainer>
    </FooterContainer>
  )
}

export default Footer
