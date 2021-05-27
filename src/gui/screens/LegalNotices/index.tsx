import React from 'react'
import styled from 'styled-components'

import { ContentContainer } from '../../components/common'
import Marginer from '../../components/marginer'
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer'

const LegalNoticesContentContainer = styled(ContentContainer)`
  text-align: justify;
`

const LegalNotices = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Mentions légales</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <LegalNoticesContentContainer>
            <p style={{ textAlign: 'center' }}>En vigueur au 24/05/2021</p>

            <p>
              Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des Utilisateurs du site https://www.shoesnotincluded.fr/ les présentes mentions légales.
              <br />
              La connexion et la navigation sur le site (indiquer le nom du site) par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.
              <br />
              Ces dernières sont accessibles sur le site à la rubrique « Mentions légales ».
            </p>

            <h2>ARTICLE 1 : L’éditeur</h2>
            {/* <p>L’édition et la direction de la publication du site https://www.shoesnotincluded.fr/ est assurée par Anthony Labaere, domiciliée 25 rue Jules Piedeleu, dont le numéro de téléphone est 0762175541, et l&apos;adresse e-mail contact@shoesnotincluded.fr.</p> */}
            <p>L’édition et la direction de la publication du site https://www.shoesnotincluded.fr/ est assurée par Anthony Labaere, domiciliée 25 rue Jules Piedeleu, dont l&apos;adresse e-mail est contact@shoesnotincluded.fr.</p>

            <h2>ARTICLE 2 : L’hébergeur</h2>
            <p>L&apos;hébergeur du site https://www.shoesnotincluded.fr/ est la Société Netlify, dont le siège social est situé au 2325 3rd Street, Suite 215 94107 San Francisco, avec le numéro de téléphone : (415) 691-1573.</p>

            <h2>ARTICLE 3 : Accès au site</h2>
            <p>
              Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.
              <br />
              En cas de modification, interruption ou suspension des services le site https://www.shoesnotincluded.fr/ ne saurait être tenu responsable.
            </p>

            <h2>ARTICLE 4 : Collecte des données</h2>
            <p>Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la mesure où il ne collecte aucune donnée concernant les utilisateurs.</p>

            <h2>ARTICLE 5 : Cookies</h2>

            <p>
              L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.
              <br />
              En naviguant sur le site, il les accepte.
              <br />
              Un cookie est un élément qui ne permet pas d’identifier l’Utilisateur mais sert à enregistrer des informations relatives à la navigation de celui-ci sur le site Internet. L’Utilisateur pourra désactiver ce cookie par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.
            </p>

            <h2>ARTICLE 6 : Propriété intellectuelle</h2>
            <p>
              Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du site https://www.shoesnotincluded.fr/, sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.
              <br />
              Pour plus d’informations, se reporter aux CGU du site https://www.shoesnotincluded.fr/ accessible à la rubrique« CGU »
            </p>
          </LegalNoticesContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default LegalNotices
