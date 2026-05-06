import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Layout from '@/src/gui/components/layout'

import FrameStepsImg from '../../../public/images/1frameSteps.png'
import FrameStepImg from '../../../public/images/2frameStep.png'
import FrameCarrouselImg from '../../../public/images/3frameCarrousel.png'
import FrameCodeImg from '../../../public/images/4frameCode.png'
import FrameVoiceImg from '../../../public/images/5frameVoice.png'
import FrameChronoImg from '../../../public/images/6frameChrono.png'
import FrameShoesImg from '../../../public/images/7frameShoes.png'
import FrameSynchroImg from '../../../public/images/8frameSynchro.png'
import { YOUTUBE_EXPLICATIONS_VIDEO_URL } from '../../constants'
import Button from '../../gui/components/button'
import {
  ContentContainer,
  StyledLink,
  StyledReactPlayer,
} from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import styles from './index.module.scss'



const WhatIsThat = (): React.ReactElement => {
  return (
    <Layout
      meta={{
        title: 'Fonctionnement Escape Game en Extérieur - ShoesNotIncluded',
        description:
          "Fonctionnement : seul ou à plusieurs, déplacez vous en ville pour trouver des indices et résoudre les énigmes des jeux d'escape games de l'application mobile.",
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Un escape game sur mobile, comment ça marche ?</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentContainer>
            <Marginer direction="vertical" margin="2em" />
            <h2>Pour commencer : c&apos;est quoi un escape game ?</h2>
            <div className={`fs-5 ${styles.textContainer}`}>
              <p>
                L&apos;
                <StyledLink href="/blog/escape-game">escape game</StyledLink>{' '}
                est un concept de jeu qui consiste à résoudre des énigmes et des
                défis en équipe dans un délai imparti. Il existe différents
                types d&apos;escape game, chacun avec ses propres
                caractéristiques.
              </p>
            </div>
          </ContentContainer>
          <ContentContainer>
            <h2>Vidéo de présentation :</h2>
            <StyledReactPlayer url={YOUTUBE_EXPLICATIONS_VIDEO_URL} />
            <Marginer direction="vertical" margin="2em" />
          </ContentContainer>
          <ContentPageContainer coloredBackground>
            <Marginer direction="vertical" margin="2em" />
            <ContentContainer>
              <h2>
                ShoesNotIncluded, c&apos;est un jeu reprenant fidèlement les
                codes de l&apos;escape game mais en plein air.
              </h2>
              <div className={`fs-5 ${styles.textContainer}`}>
                <p>
                  La différence avec ce qu&apos;on peut trouver ailleurs ? Le
                  support est pensé <b>multijoueur</b> : les actions sont
                  synchronisées entre les <b>joueurs</b> connectés sur une même
                  partie. Et en plus, le prix est unique quelque soit le nombre
                  de joueur : pas besoin de se ruiner pour jouer sur plusieurs
                  smartphones !
                  <br />
                  <br />
                </p>
                <h3>
                  C&apos;est un mix entre un <b>escape game</b> et un{' '}
                  <b>jeu de piste</b>.
                </h3>
                Plus concrètement, c&apos;est une <b>application mobile</b>{' '}
                présentant des jeux où :
                <br />
                <ul>
                  <li>
                    Chaque jeu est constitué de <u>plusieurs étapes</u>.
                  </li>
                  <Image className={styles.imageBetweenLi} src={FrameStepsImg} alt="Frame steps" />
                  <li>
                    Chaque étape correspond à un <u>lieu donné</u>, à trouver en
                    résolvant une énigme.
                  </li>
                  <Image className={styles.imageBetweenLi} src={FrameStepImg} alt="Frame step" />
                  <li>
                    Une fois à proximité du lieu, vous aurez automatiquement
                    accès, via une géolocalisation, à des indices et{' '}
                    <u>
                      <b>énigmes</b> sous la forme de cartes
                    </u>
                    .
                  </li>
                  <Image className={styles.imageBetweenLi} src={FrameCarrouselImg}
                    alt="Frame carrousel"
                  />
                  <li>
                    Vous devrez alors résoudre une série d&apos;énigmes en vous
                    basant sur les indices affichés et l&apos;
                    <u>environnement local</u>, en trouvant des <u>codes</u>...
                  </li>
                  <Image className={styles.imageBetweenLi} src={FrameCodeImg} alt="Frame code" />
                  <li>
                    ...et en effectuant certaines <u>manipulations</u>.
                  </li>
                  <Image className={styles.imageBetweenLi} src={FrameVoiceImg} alt="Frame voice" />
                  <li>
                    Une fois tous les codes trouvés et manipulations réalisées,
                    vous aurez alors accès à l&apos;énigme de l&apos;étape
                    suivante.
                  </li>
                </ul>
                <p>
                  Vous pouvez vous représenter chaque étape{' '}
                  <u>
                    comme une salle d&apos;un <b>escape game</b>
                  </u>{' '}
                  : les étapes sont remplies d&apos;indices et de codes à
                  trouver, tout comme une salle d&apos;escape game.
                  <br />
                  <br />
                  Attention, vous ne connaîtrez pas le nombre d&apos;étapes
                  d&apos;un jeu. Alors ne traînez pas !<br />
                  <Image className={styles.imageIntoParagraph} src={FrameChronoImg} alt="Frame chrono" />
                </p>
                <p>
                  La durée approximative du jeu est indiquée sur
                  l&apos;application, mais vous pouvez compter{' '}
                  <u>60 à 90 minutes</u>. Un conseil : venez avec de bonnes
                  chaussures ;)
                  <br />
                  <Image className={styles.imageIntoParagraph} src={FrameShoesImg} alt="Frame shoes" />
                </p>
                <p>
                  Un dernier détail : toutes les actions sont{' '}
                  <u>synchronisées</u> entre les smartphones des différents
                  joueurs :<br />
                  <Image className={styles.imageIntoParagraph} src={FrameSynchroImg}
                    alt="Frame synchro"
                  />
                </p>
                <p>
                  <u>
                    <b>
                      Vous pouvez jouer jusqu&apos;à 5 sur une même partie,
                      chacun sur votre smartphone
                    </b>
                  </u>{' '}
                  !<br />
                </p>
                <p>
                  Parce que pour nous, l&apos;élément essentiel d&apos;un escape
                  game est{' '}
                  <u>
                    <b>le travail d&apos;équipe</b>
                  </u>
                  .
                </p>
              </div>
              <Link
                style={{ display: 'flex', flex: 1, marginTop: 25 }}
                href="/achat"
              >
                <Button style={{ flex: 1 }}>
                  Acheter un bon pour une partie d&apos;escape game
                </Button>
              </Link>
            </ContentContainer>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default WhatIsThat
