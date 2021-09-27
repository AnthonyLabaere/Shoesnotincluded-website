import React from 'react'
import styled from 'styled-components'

import { ContentContainer } from '../../components/common'
import Marginer from '../../components/marginer'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer'
import ShareLinkImg from '../../../assets/images/partager-lien.png'

const ShareLinkImage = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  img {
    width: 400px;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    margin-top: 5px;
    margin-bottom: 5px;
    img {
      width: 250px;
    }
  }
`

const TextContainer = styled.div`
  font-size: 1.1rem;
  text-align: justify;
`

const WhatIsThat = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Problème de redirection vers l'application mobile</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer coloredBackground>
          <Marginer direction="vertical" margin="2em" />
          <ContentContainer>
            <h2>Si vous n'avez pas été redirigé vers l'application mobile après un clic sur le lien partagé par un autre joueur, merci de suivre les indications suivantes :</h2>
            <TextContainer>
              <ul>
                <li>Veuillez ne cliquer sur le lien de partage que depuis un appareil mobile (smartphone ou tablette)</li>
                {/* TODO : ajouter le lien vers les stores */}
                <li>Vérifiez que l'application mobile ShoesNotIncluded est bien installée sur votre smartphone ou tablette</li>
                <li>
                  Choisissez d'ouvrir le lien avec l'application mobile et non un navigateur (exemple avec l'image ci-dessous où il est nécessaire de cliquer sur "ShoesNotIncluded") :
                  <ShareLinkImage>
                    <img src={ShareLinkImg} alt="Partager lien" />
                  </ShareLinkImage>
                </li>
                <li>Certains applications sur lesquelles ce lien vous a été partagé peuvent ne pas vous proposer par défaut d'ouvrir le lien avec l'application. Vous avez dans ce cas de figure deux possibilités :</li>
                <ul>
                  <li>utiliser une autre application (exemple : votre messagerie sms, WhatsApp, Signal, Slack, etc.)</li>
                  <li>modifier la configuration de l'application concernée (exemple : avec Facebook Messenger, appuyez sur votre photo de profil en haut à gauche. Faites défiler jusqu'à Photos et médias. Entrez dans ce sous-menu et activez la bascule « Ouvrir les liens dans le navigateur par défaut »</li>
                </ul>
              </ul>
            </TextContainer>
          </ContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default WhatIsThat
