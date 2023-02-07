import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import ShareLinkImg from '../../../public/images/partager-lien.png'
import { ContentContainer } from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'

const ShareLinkImage = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  img {
    width: 400px;
  }
  height: auto;

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

const RedirectionError = (): React.ReactElement => {
  return (
    <Layout
      meta={{
        title: 'Problème de redirection - ShoesNotIncluded',
        description: "Problème de redirection vers l'application mobile.",
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Problème de redirection vers l&apos;application mobile</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer coloredBackground>
            <Marginer direction="vertical" margin="2em" />
            <ContentContainer>
              <h2>
                Si vous n&apos;avez pas été redirigé vers l&apos;application
                mobile après un clic sur le lien partagé par un autre joueur,
                merci de suivre les indications suivantes :
              </h2>
              <TextContainer>
                <ul>
                  <li>
                    Veuillez ne cliquer sur le lien de partage que depuis un
                    appareil mobile (smartphone ou tablette)
                  </li>
                  {/* TODO : ajouter le lien vers les stores */}
                  <li>
                    Vérifiez que l&apos;application mobile ShoesNotIncluded est
                    bien installée sur votre smartphone ou tablette
                  </li>
                  <li>
                    Choisissez d&apos;ouvrir le lien avec l&apos;application
                    mobile et non un navigateur (exemple avec l&apos;image
                    ci-dessous où il est nécessaire de cliquer sur
                    &quot;ShoesNotIncluded&quot;) :
                    <ShareLinkImage>
                      <Image
                        priority
                        src={ShareLinkImg}
                        width={400}
                        alt="Partager lien"
                      />
                    </ShareLinkImage>
                  </li>
                  <li>
                    Certains applications sur lesquelles ce lien vous a été
                    partagé peuvent ne pas vous proposer par défaut
                    d&apos;ouvrir le lien avec l&apos;application. Vous avez
                    dans ce cas de figure deux possibilités :
                  </li>
                  <ul>
                    <li>
                      utiliser une autre application (exemple : votre messagerie
                      sms, WhatsApp, Signal, Slack, etc.)
                    </li>
                    <li>
                      modifier la configuration de l&apos;application concernée
                      (exemple : avec Facebook Messenger, appuyez sur votre
                      photo de profil en haut à gauche. Faites défiler
                      jusqu&apos;à Photos et médias. Entrez dans ce sous-menu et
                      activez la bascule « Ouvrir les liens dans le navigateur
                      par défaut »
                    </li>
                  </ul>
                </ul>
              </TextContainer>
            </ContentContainer>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default RedirectionError
