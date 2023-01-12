import React from 'react';
import styled from 'styled-components';

import { ContentContainer } from '../../components/common';
import Marginer from '../../components/marginer';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';

const LegalNoticesContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const LegalNotices = (): React.ReactElement => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Mentions Légales</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <LegalNoticesContentContainer>
            <div>
              <h3>
                <span style={{ marginLeft: 0 }}>
                  Identification de l&apos;éditeur et de l&apos;hébergeur du site
                </span>
              </h3>
              <div>
                <p>
                  Le site https://www.shoesnotincluded.fr/ sont édités par la société
                  ShoesNotIncluded, auto-entreprise au nom de Anthony Labaere immatriculée au RCS de
                  Nantes sous le numéro 904833167, dont le siège social est sis au 25 rue Jules
                  Piedeleu, 44100 Nantes.
                </p>
                <p></p>
                <p>
                  Le directeur de la publication est Anthony Labaere, entrepreneur individuel de
                  ShoesNotIncluded, joignable au 07 68 48 15 89 ou à l&apos;adresse
                  contact@shoesnotincluded.fr.
                </p>
                <p>
                  Le site est hébergé par Netlify, 2325 3rd Street, Suite 215 94107 San Francisco,
                  USA.
                </p>
                <p>
                  La base de donnée est hébergée par Firebase, 1600 Amphitheatre Parkway, Mountain
                  View, California 94043, USA.
                </p>
                <p>
                  Les informations concernant la collecte et le traitement des données personnelles
                  (politique et déclaration) sont fournies dans la charte de données personnelles du
                  site.
                </p>
              </div>
            </div>
            <p style={{ marginTop: 40, textAlign: 'right' }}>
              Tous droits réservés - 12 novembre 2021
            </p>{' '}
          </LegalNoticesContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  );
};

export default LegalNotices;
