import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TransparentSquare from '../../../assets/images/transparent-rectangle.png';
import {
  YOUTUBE_EXPLICATIONS_VIDEO_URL,
  YOUTUBE_TEAM_BUILDING_VIDEO_URL
} from '../../../constants';
import Button from '../../components/button';
import { ContentContainer, StyledReactPlayer } from '../../components/common';
import Marginer from '../../components/marginer';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';

const TextContainer = styled.div`
  font-size: 1.1rem;
  text-align: justify;
`;

const QUOTES = [
  {
    // title: 'Un joueur de Solent',
    text: "C'était super chouette pour découvrir Nantes."
  },
  {
    // title: 'Un joueur de Solent',
    text: "C'était top !"
  },
  {
    // title: 'Un joueur de Solent',
    text: 'Très bonne intégration dans la ville !'
  }
];

const TeamBuilding = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <title>Team building et animation de séminaire - ShoesNotIncluded</title>
        <meta
          name="description"
          content="Organisez des événements d'entreprise originaux et ludiques et renforcez votre cohésion d'équipe avec les escape games en extérieur de ShoesNotIncluded."
        />
      </Helmet>
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Team-building, séminaire, évènement d&apos;entreprise</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer coloredBackground>
            <Marginer direction="vertical" margin="2em" />

            <ContentContainer>
              <TextContainer>
                <h3 className="mb-4">
                  Vous souhaitez organiser une activité d&apos;entreprise avec un escape game plein
                  air ? <b>ShoesNotIncluded</b> a un scénario pour vous !
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <StyledReactPlayer url={YOUTUBE_TEAM_BUILDING_VIDEO_URL} />
                </div>

                <br />

                <p style={{ marginBottom: 50 }}>
                  Des pirates Nantais viennent de s&apos;introduire dans votre système informatique
                  : le groupe de hackers <b>4N0NYM0U5DU44</b>. Ils ont la main sur
                  l&apos;intégralité des données de votre entreprise mais heureusement pour vous,
                  ils vous laissent une chance de les sauver. Ils considèrent Nantes comme un lieu
                  historique trop méconnu, et sont outrés du manque de connaissance de vos équipes
                  sur l&apos;histoire locale. Résolvez les énigmes réalisées par leur soin et
                  prouvez que vous êtes méritant de l&apos;héritage culturel de la ville. Vous
                  n&apos;avez que peu de temps avant que l&apos;intégralité de votre base de données
                  soit définitivement effacée. Vous n&apos;avez pas le choix, vous devez vous plier
                  à leur exigence.
                </p>
                <p>
                  Pendant approximativement 2h, vos collaborateurs devront résoudre les énigmes
                  d&apos;un escape game plein air et géolocalisé sur application mobile, leur
                  faisant traverser la ville pour en découvrir ou redécouvrir certains principaux
                  lieux culturels et historiques.
                </p>
                <p>
                  Les participants formeront des équipes de 5 et les différentes équipes seront en
                  concurrence les unes avec les autres.
                </p>
                <p>
                  Le scénario est composé d&apos;une série d&apos;étapes qui peuvent être
                  appréhendées comme les différentes salles d&apos;un escape game. Et comme dans un
                  escape game, vos collaborateurs devront travailler ensemble pour avancer dans le
                  jeu.
                </p>
                <p>
                  Et surtout avec <b>ShoesNotIncluded</b>, aucun collaborateur n&apos;est laissé de
                  côté :
                </p>
                <ul>
                  <li>
                    chaque participant a accès à l&apos;intégralité des éléments du scénario via
                    l&apos;application mobile installée sur son smartphone personnel.
                  </li>
                  <li>
                    les actions des membres d&apos;une même équipe sont synchronisées directement
                    entre les smartphones des participants.
                  </li>
                  <li>
                    le contenu de chaque étape est conçu de manière à ne pas pouvoir être résolu
                    seul : que ce soit par l&apos;entremêlement des énigmes, la quantité
                    d&apos;information ou plus simplement le support qui nécessite d&apos;être à
                    plusieurs sur certaines énigmes.
                  </li>
                </ul>
                <p>
                  Le résultat est que tous les membres de l&apos;équipe se sentent investis par le
                  jeu, participent activement et partagent un moment convivial entre collègues : la
                  cohésion d&apos;équipe en est ainsi renforcée.
                </p>
                <p>
                  Un accompagnateur gérera le départ des équipes et les attendra à la fin du
                  parcours pour un debriefing.
                </p>
                <p>Plusieurs options supplémentaires sont envisageables sur devis :</p>
                <ul>
                  <li>
                    départ et/ou arrivée proche d&apos;un lieu spécifique du centre-ville de Nantes.
                  </li>
                  <li>personnalisation du jeu avec des éléments propres à l&apos;entreprise.</li>
                  <li>intégration d&apos;une ou plusieurs étapes (= lieux) personnalisées.</li>
                  <li>distribution de récompenses.</li>
                </ul>
                <p>
                  Comptez une petite demi-heure de marche sur les deux heures de jeu, et celui-ci
                  passe par des lieux adaptés aux personnes en situation de handicap.
                </p>
                <p>
                  <span style={{ textDecoration: 'underline' }}>Attention</span> : le support du jeu
                  est le smartphone des participants, il est donc nécessaire que chacun ait un
                  téléphone chargé avec l&apos;application mobile <b>ShoesNotIncluded</b> installée.
                </p>
              </TextContainer>

              <br />

              <Carousel style={{ maxHeight: 125 }}>
                {QUOTES.map((quote, index) => {
                  return (
                    <Carousel.Item key={index} style={{ maxHeight: 125 }}>
                      <img
                        className="d-block w-100"
                        src={TransparentSquare}
                        alt="First slide"
                        style={{ maxHeight: 125 }}
                      />
                      <Carousel.Caption style={{ color: 'black' }}>
                        {/* <div className="fs-3">{quote.title}</div> */}
                        <q className="fs-3">{quote.text}</q>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>

              <Link style={{ display: 'flex', flex: 1, marginTop: 25 }} to="/contact">
                <Button style={{ flex: 1 }}>Contactez-nous pour obtenir un devis.</Button>
              </Link>

              <br />

              <TextContainer>
                <p>
                  Si vous souhaitez plus d&apos;information sur le fonctionnement de
                  l&apos;application, vous pouvez visualiser cette vidéo :
                </p>
              </TextContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledReactPlayer url={YOUTUBE_EXPLICATIONS_VIDEO_URL} />
              </div>
            </ContentContainer>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </>
  );
};

export default TeamBuilding;
