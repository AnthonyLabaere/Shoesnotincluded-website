import React from 'react'
import styled from 'styled-components'

import Crowdfunding from '../../components/crowdfunding'
import { YOUTUBE_PRESENTATION_VIDEO_URL } from '../../../constants'
import { ContentContainer, StyledReactPlayer } from '../../components/common'
import Marginer from '../../components/marginer'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer'

const TextContainer = styled.div`
  font-size: 1.1rem;
  text-align: justify;
`

const WhatIsThat = () => {
  return (
    <PageContainer>
      <Crowdfunding />
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>En quoi ça consiste ?</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentContainer>
          <Marginer direction="vertical" margin="2em" />
          <h2>Vidéo de présentation :</h2>
          <StyledReactPlayer url={YOUTUBE_PRESENTATION_VIDEO_URL} />
          <Marginer direction="vertical" margin="2em" />
        </ContentContainer>
        <ContentPageContainer coloredBackground>
          <Marginer direction="vertical" margin="2em" />
          <ContentContainer>
            <h2>Si vous n&apos;êtes pas encore convaincu après le visionnage de la vidéo :</h2>
            <h3>ShoesNotIncluded, c&apos;est un jeu reprenant fidèlement les codes de l&apos;escape game mais en plein air.</h3>
            <TextContainer>
              <p>C&apos;est un mix entre un escape game et un jeu de piste.</p>
              Plus concrètement, c&apos;est une application mobile présentant des jeux où :<br />
              <ul>
                <li>Chaque jeu est constitué de plusieurs étapes.</li>
                <li>Chaque étape correspond à un lieu donné, à trouver en résolvant une énigme.</li>
                <li>Une fois à proximité du lieu, vous aurez automatiquement accès, via une géolocalisation, à des indices et énigmes sous la forme de cartes.</li>
                <li>Vous devrez alors résoudre une série d'énigmes en vous basant sur les indices affichés et l'environnement local, en trouvant des codes et en effectuant certaines manipulations.</li>
                <li>Une fois tous les codes trouvés et manipulations réalisées, vous aurez alors accès à l&apos;énigme de l&apos;étape suivante.</li>
              </ul>
              <p>
                Vous pouvez vous représenter chaque étape comme une salle d'un escape game : les étapes sont remplies d'indices et de codes à trouver, tout comme une salle d'escape game.
                <br />
                <br />
                Attention, vous ne connaîtrez pas le nombre d'étapes d'un jeu. Alors ne traînez pas !<br />
              </p>
              <p>La durée approximative du jeu est indiquée sur l'application, mais vous pouvez compter 60 à 90 minutes. Un conseil : venez avec de bonnes chaussures ;)</p>
              <p>
                Un dernier détail : toutes les actions sont synchronisées entre les smartphones des différents joueurs : <b>vous pouvez jouer jusqu&apos;à 5 sur une même partie, chacun sur votre smartphone</b> !<br />
                Parce que pour nous, l&apos;élément essentiel d&apos;un escape game est <b>le travail d&apos;équipe</b>.
              </p>
            </TextContainer>
          </ContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default WhatIsThat
