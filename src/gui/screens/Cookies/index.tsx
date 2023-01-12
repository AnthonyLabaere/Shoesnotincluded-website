import React from 'react';
import styled from 'styled-components';

import { ContentContainer } from '../../components/common';
import Marginer from '../../components/marginer';
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer
} from '../../components/pageContainer';

const CookiesContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const Cookies = (): React.ReactElement => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Listes des cookies</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <CookiesContentContainer>
            <div>
              <div>
                <div>
                  <div>
                    <h3>
                      <span style={{ marginLeft: 30 }}>
                        <span style={{ marginLeft: 10 }}></span>Cookies strictement nécessaires
                      </span>
                    </h3>
                    <p>
                      Ces cookies sont nécessaires au fonctionnement du site Web et ne peuvent pas
                      être désactivés dans nos systèmes. Ils sont généralement établis en réponse à
                      des actions que vous avez effectuées et qui constituent une demande de
                      services, telles que la connexion ou le remplissage de formulaires. Vous
                      pouvez configurer votre navigateur afin de bloquer ou être informé de
                      l&apos;existence de ces cookies, mais certaines parties du site Web peuvent
                      être affectées. Ces cookies ne stockent aucune information
                      d&apos;identification personnelle.
                    </p>
                  </div>

                  <div>
                    <h3>
                      <span style={{ marginLeft: 30 }}>
                        <span style={{ marginLeft: 10 }}></span>Cookies de mesure d&apos;audience
                      </span>
                    </h3>
                    <div>
                      Ces cookies nous permettent de déterminer le nombre de visites et les sources
                      du trafic sur notre site web, afin d&apos;en mesurer et d&apos;en améliorer
                      les performances. Ils nous aident également à identifier les pages les plus /
                      moins visitées et à évaluer comment les visiteurs naviguent sur le site.
                      Toutes les informations, collectées par ces cookies, sont agrégées et donc
                      anonymisées. Si vous n&apos;acceptez pas cette catégorie de cookies, nous ne
                      pourrons pas savoir quand vous avez réalisé votre visite sur notre site web.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CookiesContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  );
};

export default Cookies;
