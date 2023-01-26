import React from 'react';

import HeaderImageSource from '../../../assets/images/blog/escape-game.jpg';
import BlogPage from '../../components/BlogPage';
import { StyledLink } from '../../components/common';

const WhatIsAnEscapeGame = (): React.ReactElement => {
  return (
    <BlogPage
      meta={{
        title: "C'est quoi un Escape Game - ShoesNotIncluded",
        description:
          "Découvrez ce qu'est un escape game et ses bénéfices pour renforcer l'esprit d'équipe et passer un bon moment en famille ou entre amis."
      }}
      headerImageSource={HeaderImageSource}
      title="Qu'est-qu'un escape game ?">
      <p>
        L&apos;<b>escape game</b> est un concept de jeu qui consiste à résoudre des énigmes et des
        défis en équipe dans un délai imparti. Il existe différents types d&apos;escape game, chacun
        avec ses propres caractéristiques.
      </p>
      <p>
        Les escape games physiques, ou &quot;escape room&quot; en anglais, sont les plus courants.
        La première salle a été ouverte en 2007 même si l&apos;
        <StyledLink to="/origine-escape-game">origine</StyledLink> des escape games est en réalité
        plus ancienne. Les joueurs sont enfermés dans une pièce ou un bâtiment et doivent utiliser
        des indices et des objets dissimulés pour résoudre des énigmes et s&apos;échapper avant la
        fin du temps imparti. Ces escape rooms peuvent être thématiques, basées sur des films ou des
        histoires célèbres, ou plus générales.
      </p>
      <p>
        Il y a aussi les escape games de société, qui sont des jeux de plateau qui peuvent être
        joués à la maison. Ces jeux utilisent des mécanismes similaires à ceux des escape rooms
        physiques, mais les joueurs n&apos;ont pas besoin de se déplacer pour les jouer.
      </p>
      <p>
        Les escape games vidéo, enfin, sont des jeux d&apos;aventure ou de rôle qui reprennent les
        principes des escape rooms, mais dans un univers virtuel. Les joueurs doivent encore
        résoudre des énigmes et s&apos;échapper avant la fin du temps imparti, mais ils le font en
        utilisant un personnage virtuel et en explorant un environnement virtuel.
      </p>
      <p>
        Il existe même des escape games en{' '}
        <StyledLink to="/escape-game-plein-air">plein air</StyledLink>, ou &quot;escape walk&quot;,
        qui utilisent l&apos;environnement réel pour créer une expérience d&apos;évasion, parfois en
        utilisant un support <StyledLink to="/escape-game-mobile">mobile</StyledLink>. Les joueurs
        doivent parcourir une zone définie pour résoudre des énigmes et s&apos;échapper avant la fin
        du temps imparti. Il est important par contre de ne pas confondre <b>escape game</b> et jeu
        de piste, des <StyledLink to="/difference-jeu-de-piste-escape-game">différences</StyledLink>{' '}
        structurelles pouvant être listées entre les deux types d&apos;activités.
      </p>
      <p>
        Quels que soient le type d&apos;escape game choisi, le support importe moins que l&apos;idée
        de faire l&apos;activité en équipe. Les escape games sont conçus pour être joués en groupe,
        et ils favorisent la communication, la collaboration et la réflexion en équipe. Les escape
        games sont donc une activité idéale pour renforcer les liens entre les membres d&apos;une
        équipe ou pour célébrer un événement en groupe.
      </p>
      <p>
        Pas complètement convaincu ? Nous avons répertorié{' '}
        <StyledLink to="/10-raisons-de-faire-escape-game">10 bonnes raisons</StyledLink> de faire un{' '}
        <b>escape game</b>. N&apos;hésitez pas à les découvrir dans notre article dédié, vous y
        découvrirez les avantages de cette activité, comme renforcer l&apos;esprit d&apos;équipe,
        stimuler le cerveau, découvrir un lieu de manière originale, entre autres. N&apos;attendez
        plus pour vous lancer dans l&apos;aventure !
      </p>
    </BlogPage>
  );
};

export default WhatIsAnEscapeGame;
