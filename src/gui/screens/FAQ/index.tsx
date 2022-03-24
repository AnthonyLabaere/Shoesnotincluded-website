import React from 'react';
import styled from 'styled-components';

import * as Constants from '../../../constants';
import { ContentContainer, StyledALink, StyledLink } from '../../components/common';
import Marginer from '../../components/marginer';
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer';

const Question = styled.h2`
`;

const Response = styled.div`
`;

const FAQ = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Foire aux questions</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <Marginer direction="vertical" margin="2em" />
          <ContentContainer>
            <Question>Combien compte une partie ?</Question>
            <Response>
              Une partie coûte <span style={{ fontWeight: "bold" }}>{Constants.WEBSITE_GAME_COST}</span> si vous l'achetez directement sur le site web, contre <span style={{ fontWeight: "bold" }}>{Constants.APP_GAME_COST}</span> sur l'application mobile.<br />
              Vous profitez donc d'une réduction de <span style={{ fontWeight: "bold" }}>{Constants.WEBSITE_TO_APP_GAME_REDUCTION_PERCENT}%</span> en l'<StyledLink to="/achat">achetant sur ce site</StyledLink>. 🎉<br /><br />
              Pourquoi ? Les frais appliqués par les stores sont plus élevés que ceux du site, tout simplement.
            </Response>

            <Question>Combien de joueurs sur une partie ?</Question>
            <Response>
              Vous pouvez jouer jusqu'à 5 (smartphones synchronisés entre-eux) à une partie.<br />
              Le tarif ci-dessus est bien applicable pour le groupe dans son intégralité : vous n'avez qu'à payer <span style={{ fontWeight: "bold" }}>une seule fois</span> pour les 5 joueurs.<br />
              Le joueur achetant la partie (ou utilisant un bon d'achat) a la possibilité d'inviter 4 autres personnes lors du lancement de la partie.<br />
            </Response>

            {/* <Question>TODO Question enfants</Question>
            <Response>
              TODO réponse enfant
            </Response> */}

            <Question>Comment utiliser un bon d'achat ?</Question>
            <Response>
              1 - Ouvrez l'application ShoesNotIncluded (ou téléchargez-là au préalable sur les stores <StyledALink href={Constants.PLAY_STORE_LINK}>Android</StyledALink> ou <StyledALink href={Constants.APPLE_STORE_LINK}>Apple</StyledALink>).<br />
              2 - Sélectionnez un scénario (exemple : Le testament d'Anne de Bretagne)<br />
              3 - Cliquez sur "Utiliser un bon d'achat"<br />
              4 - Renseignez le code du bon d'achat obtenu lors du paiement.
            </Response>

            <Question>Comment retrouver le code de mon bon d'achat ?</Question>
            <Response>
              Retournez sur la page de votre <StyledLink to="/compte">compte</StyledLink> pour consulter votre historique de paiement. Les bons de commande associés aux paiements sont listés dans la colonne de droite.<br />
              ⚠ Attention : vous devez être connecté avec le même compte utilisateur que lors de la commande !
            </Response>
          </ContentContainer>
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default FAQ
