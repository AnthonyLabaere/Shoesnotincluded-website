import React from 'react';
import { Helmet } from 'react-helmet';

import { ContentContainer } from '../../components/common';
import Marginer from '../../components/marginer';
import { InnerPageContainer, PageContainer } from '../../components/pageContainer';
import TopSection from '../../components/topSection';
import AboutVideo from './aboutVideo';
import Stores from './stores';

const Home = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <title>Escape Game sur Mobile en plein air - ShoesNotIncluded</title>
        <meta
          name="description"
          content="ShoesNotIncluded est une application mobile d'escape game en plein air, multijoueur, pour les particuliers ou les entreprises recherchant un team building."
        />
      </Helmet>
      <PageContainer>
        <TopSection />
        <InnerPageContainer>
          <Marginer direction="vertical" margin="2em" />
          <ContentContainer>
            <AboutVideo />
          </ContentContainer>
          <Marginer direction="vertical" margin="2em" />
          <Stores />
        </InnerPageContainer>
      </PageContainer>
    </>
  );
};

export default Home;
