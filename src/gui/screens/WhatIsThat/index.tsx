import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { YOUTUBE_EXPLICATIONS_VIDEO_URL } from '../../../constants'
import { ContentContainer, StyledReactPlayer } from '../../components/common'
import Marginer from '../../components/marginer'
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer'
import Button from '../../components/button'

import FrameStepsImg from '../../../assets/images/1frameSteps.png'
import FrameStepImg from '../../../assets/images/2frameStep.png'
import FrameCarrouselImg from '../../../assets/images/3frameCarrousel.png'
import FrameCodeImg from '../../../assets/images/4frameCode.png'
import FrameVoiceImg from '../../../assets/images/5frameVoice.png'
import FrameChronoImg from '../../../assets/images/6frameChrono.png'
import FrameShoesImg from '../../../assets/images/7frameShoes.png'
import FrameSynchroImg from '../../../assets/images/8frameSynchro.png'

const TextContainer = styled.div`
  font-size: 1.1rem;
  text-align: justify;
`

const Image = styled.img`
  width: 50%;
  margin-top: 15px;
  margin-bottom: 15px;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`
const ImageBetweenLi = styled(Image)`
  margin-bottom: 15px;
`

const ImageIntoParagraph = styled(Image)``

const WhatIsThat = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>En quoi ça consiste ?</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentContainer>
          <Marginer direction="vertical" margin="2em" />
          <h2>Vidéo de présentation :</h2>
          <StyledReactPlayer url={YOUTUBE_EXPLICATIONS_VIDEO_URL} />
          <Marginer direction="vertical" margin="2em" />
        </ContentContainer>
        <ContentPageContainer coloredBackground>
          <Marginer direction="vertical" margin="2em" />
          <ContentContainer>
            <h3>ShoesNotIncluded, c&apos;est un jeu reprenant fidèlement les codes de l&apos;escape game mais en plein air.</h3>
            <TextContainer>
              <p>
                <b>La différence avec ce qu'on peut trouver ailleurs ? Le support est pensé multijoueur : les actions sont synchronisées entre les joueurs connectés sur une même partie. Et en plus, le prix est unique quelque soit le nombre de joueur : pas besoin de se ruiner pour jouer sur plusieurs smartphones !</b>
                <br />
                <br />
              </p>
              <p>
                C&apos;est un mix entre un <u>escape game</u> et un <u>jeu de piste</u>.
              </p>
              Plus concrètement, c&apos;est une <u>application mobile</u> présentant des jeux où :<br />
              <ul>
                <li>
                  Chaque jeu est constitué de <u>plusieurs étapes</u>.
                </li>
                <ImageBetweenLi src={FrameStepsImg} alt="Frame steps" />
                <li>
                  Chaque étape correspond à un <u>lieu donné</u>, à trouver en résolvant une énigme.
                </li>
                <ImageBetweenLi src={FrameStepImg} alt="Frame step" />
                <li>
                  Une fois à proximité du lieu, vous aurez automatiquement accès, via une géolocalisation, à des indices et <u>énigmes sous la forme de cartes</u>.
                </li>
                <ImageBetweenLi src={FrameCarrouselImg} alt="Frame carrousel" />
                <li>
                  Vous devrez alors résoudre une série d'énigmes en vous basant sur les indices affichés et l'<u>environnement local</u>, en trouvant des <u>codes</u>...
                </li>
                <ImageBetweenLi src={FrameCodeImg} alt="Frame code" />
                <li>
                  ...et en effectuant certaines <u>manipulations</u>.
                </li>
                <ImageBetweenLi src={FrameVoiceImg} alt="Frame voice" />
                <li>Une fois tous les codes trouvés et manipulations réalisées, vous aurez alors accès à l&apos;énigme de l&apos;étape suivante.</li>
              </ul>
              <p>
                Vous pouvez vous représenter chaque étape <u>comme une salle d'un escape game</u> : les étapes sont remplies d'indices et de codes à trouver, tout comme une salle d'escape game.
                <br />
                <br />
                Attention, vous ne connaîtrez pas le nombre d'étapes d'un jeu. Alors ne traînez pas !<br />
                <ImageIntoParagraph src={FrameChronoImg} alt="Frame chrono" />
              </p>
              <p>
                La durée approximative du jeu est indiquée sur l'application, mais vous pouvez compter <u>60 à 90 minutes</u>. Un conseil : venez avec de bonnes chaussures ;)
                <br />
                <ImageIntoParagraph src={FrameShoesImg} alt="Frame shoes" />
              </p>
              <p>
                Un dernier détail : toutes les actions sont <u>synchronisées</u> entre les smartphones des différents joueurs :<br />
                <ImageIntoParagraph src={FrameSynchroImg} alt="Frame synchro" />
              </p>
              <p>
                <u>
                  <b>Vous pouvez jouer jusqu&apos;à 5 sur une même partie, chacun sur votre smartphone</b>
                </u>{' '}
                !<br />
              </p>
              <p>
                Parce que pour nous, l&apos;élément essentiel d&apos;un escape game est{' '}
                <u>
                  <b>le travail d&apos;équipe</b>
                </u>
                .
              </p>
            </TextContainer>
            <Link style={{ flex: 1 }} to="/achat"><Button style={{ width: '100%' }}>Je souhaite acheter un bon pour une partie</Button></Link>
          </ContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default WhatIsThat
