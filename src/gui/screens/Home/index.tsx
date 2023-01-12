import React from 'react';

import { ContentContainer } from '../../components/common';
import Marginer from '../../components/marginer';
import { InnerPageContainer, PageContainer } from '../../components/pageContainer';
import TopSection from '../../components/topSection';
import AboutVideo from './aboutVideo';
import Stores from './stores';

const Home = (): React.ReactElement => {
  return (
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
  );
};

export default Home;
