import React from 'react'
import styled from 'styled-components'

import { ContentContainer } from '../../components/common'
import Marginer from '../../components/marginer'
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer'

const CookiesContentContainer = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`

const Cookies = () => {
  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Cookies</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <CookiesContentContainer>
            <div>
              <div>
                <p>Aucun cookie n'est utilisé pour l'instant par le site shoesnotincluded.fr.</p>
              </div>
            </div>
          </CookiesContentContainer>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default Cookies
