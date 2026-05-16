import React from 'react'

import Layout from '@/src/gui/components/layout'

import * as Constants from '../../constants'
import {
  ContentContainer,
  StyledALink,
  StyledLink,
  StyledReactPlayer,
} from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'

const FAQ = (): React.ReactElement => {
  return (
    <Layout
      meta={{
        title: 'Escape Game sur Mobile - FAQ - ShoesNotIncluded',
        description:
          'Trouvez les réponses à vos questions sur les escape games en extérieur sur application mobile de ShoesNotIncluded sur notre page FAQ.',
      }}
      noIndex
    >
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
              <h2>Combien compte une partie ?</h2>
              <div>
                Une partie coûte{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {Constants.WEBSITE_GAME_COST}
                </span>{' '}
                si vous l&apos;achetez directement sur le site web, contre{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {Constants.APP_GAME_COST}
                </span>{' '}
                sur l&apos;application mobile.
                <br />
                Vous profitez donc d&apos;une réduction de{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {Constants.WEBSITE_TO_APP_GAME_REDUCTION_PERCENT}%
                </span>{' '}
                en l&apos;
                <StyledLink href="/achat">achetant sur ce site</StyledLink>. 🎉
                <br />
                <br />
                Pourquoi ? Les frais appliqués par les stores sont plus élevés
                que ceux du site, tout simplement.
              </div>
              <br />

              <h2>Combien de joueurs sur une partie ?</h2>
              <div>
                Vous pouvez jouer jusqu&apos;à 5 (smartphones synchronisés
                entre-eux) à une partie.
                <br />
                Le tarif ci-dessus est bien applicable pour le groupe dans son
                intégralité : vous n&apos;avez qu&apos;à payer{' '}
                <span style={{ fontWeight: 'bold' }}>une seule fois</span> pour
                les 5 joueurs.
                <br />
                Le joueur achetant la partie (ou utilisant un bon d&apos;achat)
                a la possibilité d&apos;inviter 4 autres personnes lors du
                lancement de la partie.
                <br />
              </div>
              <br />

              {/* <h2>TODO Question enfants</h2>
            <div>
              TODO réponse enfant
            </div> */}

              <h2>Comment utiliser un bon d&apos;achat ?</h2>
              <div>
                <div className="mb-2">
                  <StyledReactPlayer
                    url={Constants.YOUTUBE_USER_VOUCHER_FAQ_VIDEO_URL}
                  />
                </div>
                1 - Ouvrez l&apos;application ShoesNotIncluded (ou
                téléchargez-là au préalable sur les stores{' '}
                <StyledALink href={Constants.PLAY_STORE_LINK}>
                  Android
                </StyledALink>{' '}
                ou{' '}
                <StyledALink href={Constants.APPLE_STORE_LINK}>
                  Apple
                </StyledALink>
                ).
                <br />
                2 - Sélectionnez un scénario (exemple : Le testament d&apos;Anne
                de Bretagne)
                <br />
                3 - Cliquez sur &quot;Utiliser un bon d&apos;achat&quot;
                (uniquement disponible sur Android)
                <br />
                4 - Renseignez le code du bon d&apos;achat obtenu lors du
                paiement.
                <br />
                5 - Le joueur utilisant un bon d&apos;achat a alors la
                possibilité d&apos;inviter 4 autres personnes lors du lancement
                de la partie, qu&apos;ils soient sur Android ou Apple.
                <br />
                <i>
                  Précision : les bons d&apos;achat ne sont pour l&apos;instant
                  pas visibles dans l&apos;historique de l&apos;application
                  mobile.
                </i>
              </div>
              <br />

              <h2>Comment rejoindre une partie ?</h2>
              <div>
                1 - Ouvrez l&apos;application ShoesNotIncluded (ou
                téléchargez-là au préalable sur les stores{' '}
                <StyledALink href={Constants.PLAY_STORE_LINK}>
                  Android
                </StyledALink>{' '}
                ou{' '}
                <StyledALink href={Constants.APPLE_STORE_LINK}>
                  Apple
                </StyledALink>
                ).
                <br />
                2 - Cliquez sur Rejoindre une partie.
                <br />
                3 - Scannez le QR code de la partie obtenu par le joueur ayant
                lancé la partie.
                <br />
              </div>
              <br />

              <h2>
                Comment retrouver le code de mon bon d&apos;achat ?
              </h2>
              <div>
                Retournez sur la page de votre{' '}
                <StyledLink href="/compte">compte</StyledLink> pour consulter
                votre historique de paiement. Les bons de commande associés aux
                paiements sont listés dans la colonne de droite.
                <br />⚠ Attention : vous devez être connecté avec le même compte
                utilisateur que lors de la commande !
              </div>
              <br />
            </ContentContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default FAQ
