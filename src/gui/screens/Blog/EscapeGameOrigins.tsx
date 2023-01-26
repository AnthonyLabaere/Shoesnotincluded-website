import React from 'react';

import HeaderImageSource from '../../../assets/images/blog/myst.jpg';
import BlogPage from '../../components/BlogPage';
import { StyledLink } from '../../components/common';

const EscapeGameOrigins = (): React.ReactElement => {
  return (
    <BlogPage
      meta={{
        title: "L'origine de l'Escape Game - ShoesNotIncluded",
        description:
          "Explorez l'histoire des escape games et découvrez d'où vient leur popularité. Comprenez leur origine et les différents types d'escape games disponibles."
      }}
      headerImageSource={HeaderImageSource}
      title="L'origine des escape games">
      <p>
        L&apos;<StyledLink to="/escape-game">escape game</StyledLink> est un concept de jeu
        d&apos;évasion grandeur nature où les participants doivent résoudre des énigmes et des défis
        pour s&apos;échapper d&apos;une pièce ou d&apos;un lieu fermé dans un temps imparti. Ce
        concept est devenu très populaire ces dernières années, mais il a en réalité des racines qui
        remontent à loin.
      </p>
      <p>
        L&apos;<b>origine</b> des escape games remonte aux jeux vidéo. Les premiers jeux
        d&apos;évasion ont été développés dans les années 1970 et 1980, avec des titres tels que
        &quot;Adventure&quot; et &quot;Zork&quot; qui ont introduit l&apos;idée de résoudre des
        énigmes pour progresser dans le jeu. L&apos;un des plus connus et qui a inspiré les escape
        games modernes est le célèbre jeu vidéo &quot;Myst&quot;, sorti en 1993.
      </p>
      <p>
        Celui-ci est un jeu d&apos;aventure graphique mettant le joueur dans la peau d&apos;un
        personnage qui doit explorer une île mystérieuse et résoudre des énigmes pour
        s&apos;échapper. Le jeu est connu pour ses graphismes époustouflants et son histoire
        intrigante, qui ont captivé des millions de joueurs à travers le monde.
      </p>
      <p>
        Ces jeux ont été des précurseurs, et sont à l&apos;<b>origine</b> de l&apos;escape game tel
        qu&apos;on le connaît aujourd&apos;hui, en introduisant l&apos;idée de se retrouver piégé
        dans un lieu fermé et de devoir résoudre des énigmes pour s&apos;échapper.
      </p>
      <p>
        Le premier escape room, ou jeu d&apos;évasion physique, a ouvert ses portes à Budapest en
        2007. Depuis lors, le concept a connu un succès croissant à travers le monde, avec des
        milliers d&apos;escape rooms ouvrant leurs portes dans des villes de tous les continents.
      </p>
      <p>
        Cependant, les escape games ne se limitent pas aux escape rooms physiques, ils ont également
        (re)évolué sous forme de jeux vidéo ou d&apos;
        <StyledLink to="/escape-game-mobile">applications mobiles</StyledLink>). Ces jeux numériques
        permettent aux joueurs de vivre une expérience d&apos;évasion similaire à celle des escape
        rooms physiques, mais avec la liberté de pouvoir jouer n&apos;importe où et à n&apos;importe
        quel moment. Les escape games sur application mobile permettent également d&apos;utiliser
        les fonctionnalités avancées de votre smartphone, comme la caméra, la reconnaissance vocale,
        ou les capteurs du smartphone pour améliorer l&apos;immersion des joueurs.
      </p>
      <p>
        En résumé, l&apos;escape game est un concept qui a évolué au fil des ans, ayant ses{' '}
        <b>origines</b> dans les jeux vidéo des années 1970 et 1980. Cependant, il a évolué pour
        prendre différentes formes, allant des escape rooms physiques aux jeux vidéo en passant par
        les applications mobiles. Quelle que soit la forme qu&apos;il prend, l&apos;escape game
        reste un concept amusant et stimulant qui peut être apprécié par des personnes de tous âges
        et de tous niveaux de compétence.
      </p>
    </BlogPage>
  );
};

export default EscapeGameOrigins;
