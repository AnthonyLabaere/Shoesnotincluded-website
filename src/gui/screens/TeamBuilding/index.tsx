import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { YOUTUBE_EXPLICATIONS_VIDEO_URL } from '../../../constants';
import { ContentContainer, StyledReactPlayer } from '../../components/common';
import Marginer from '../../components/marginer';
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer';
import Button from '../../components/button';

import AnonymousDu44 from '../../../assets/images/anonymousDu44.png';

const TextContainer = styled.div`
  font-size: 1.1rem;
  text-align: justify;
`;

const Image = styled.img`
  width: 50%;
  margin-top: 15px;
  margin-bottom: 15px;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`;

const Event = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Team-building, séminaire, évènement d'entreprise</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer coloredBackground>
          <Marginer direction="vertical" margin="2em" />
          <ContentContainer>
            <TextContainer>
              <h3>Vous souhaitez organiser une activité d'entreprise avec un escape game plein air ? <b>ShoesNotIncluded</b> a un scénario pour vous !</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={AnonymousDu44} alt="Anonymous du 44" />
              </div>
              <p style={{ marginBottom: 50 }}>Des pirates Nantais viennent de s'introduire dans votre système informatique : le groupe de hackers <b>4N0NYM0U5DU44</b>. Ils ont la main sur l'intégralité des données de votre entreprise mais heureusement pour vous, ils vous laissent une chance de les sauver. Ils considèrent Nantes comme un lieu historique trop méconnu, et sont outrés du manque de connaissance de vos équipes sur l'histoire locale. Résolvez les énigmes réalisées par leur soin et prouvez que vous êtes méritant de l'héritage culturel de la ville. Vous n'avez que peu de temps avant que l'intégralité de votre base de données soit définitivement effacée. Vous n'avez pas le choix, vous devez vous plier à leur exigence.</p>
              <p>Pendant approximativement 2h, vos collaborateurs devront résoudre les énigmes d'un escape game plein air et géolocalisé sur application mobile, leur faisant traverser la ville pour en découvrir ou redécouvrir certains principaux lieux culturels et historiques.</p>
              <p>Les participants formeront des équipes de 5 et les différentes équipes seront en concurrence les unes avec les autres.</p>
              <p>Le scénario est composé d'une série d'étapes qui peuvent être appréhendées comme les différentes salles d'un escape game. Et comme dans un escape game, vos collaborateurs devront travailler ensemble pour avancer dans le jeu.</p>
              <p>
                Et surtout avec <b>ShoesNotIncluded</b>, aucun collaborateur n'est laissé de côté :
                <ul>
                  <li>chaque participant a accès à l'intégralité des éléments du scénario via l'application mobile installée sur son smartphone personnel.</li>
                  <li>les actions des membres d'une même équipe sont synchronisées directement entre les smartphones des participants.</li>
                  <li>le contenu de chaque étape est conçu de manière à ne pas pouvoir être résolu seul : que ce soit par l'entremêlement des énigmes, la quantité d'information ou plus simplement le support qui nécessite d'être à plusieurs sur certaines énigmes.</li>
                </ul>
                Le résultat est que tous les membres de l'équipe se sentent investis par le jeu, participent activement et partagent un moment convivial entre collègues : la cohésion d'équipe en est ainsi renforcée.
              </p>
              <p>Un accompagnateur gérera le départ des équipes et les attendra à la fin du parcours pour un debriefing.</p>
              <p>
                Plusieurs options supplémentaires sont envisageables sur devis :
                <ul>
                  <li>départ et/ou arrivée proche d'un lieu spécifique du centre-ville de Nantes.</li>
                  <li>personnalisation du jeu avec des éléments propres à l'entreprise.</li>
                  <li>intégration d'une ou plusieurs étapes (= lieux) personnalisées.</li>
                  <li>distribution de récompenses.</li>
                </ul>
              </p>
              <p>Comptez une petite demi-heure de marche sur les deux heures de jeu, et celui-ci passe par des lieux adaptés aux personnes en situation de handicap.</p>
              <p><span style={{ textDecoration: "underline" }}>Attention</span> : le support du jeu est le smartphone des participants, il est donc nécessaire que chacun ait un téléphone chargé avec l'application mobile <b>ShoesNotIncluded</b> installée.</p>
            </TextContainer>
            <Link style={{ display: 'flex', flex: 1, marginTop: 25 }} to="/contact"><Button style={{ flex: 1 }}>Contactez-nous pour obtenir un devis.</Button></Link>
            <TextContainer>
              <p>Si vous souhaitez plus d'information sur le fonctionnement de l'application, vous pouvez visualiser cette vidéo :</p>
            </TextContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StyledReactPlayer url={YOUTUBE_EXPLICATIONS_VIDEO_URL} />
            </div>

          </ContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default Event
