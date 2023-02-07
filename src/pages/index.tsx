import React from 'react'

import AboutVideo from '../gui/components/aboutVideo'
import { ContentContainer } from '../gui/components/common'
import Layout from '../gui/components/layout'
import Marginer from '../gui/components/marginer'
import {
  InnerPageContainer,
  PageContainer,
} from '../gui/components/pageContainer'
import Stores from '../gui/components/stores'
import TopSection from '../gui/components/topSection'

const Home = (): React.ReactElement => {
  return (
    <Layout
      meta={{
        title: 'Escape Game sur Mobile en plein air - ShoesNotIncluded',
        description:
          "ShoesNotIncluded est une application mobile d'escape game en plein air, multijoueur, pour les particuliers ou les entreprises recherchant un team building.",
      }}
    >
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
    </Layout>
  )
}

export default Home
