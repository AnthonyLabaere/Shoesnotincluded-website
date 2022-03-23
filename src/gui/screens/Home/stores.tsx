import React from 'react'
import styled from 'styled-components'

import Marginer from '../../components/marginer'
import { ContentPageContainer } from '../../components/pageContainer'
import StoreButtons from '../../components/StoreButtons'

const Title = styled.h1`
  color: #000;
  text-align: center;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    font-size: 20px;
  }
`
const Stores = () => {
  return (
    <ContentPageContainer coloredBackground id="stores">
      <Marginer direction="vertical" margin="5em" />
      <Title>
        ShoesNotIncluded est sur les stores !
        <br />
        <br />
        Téléchargez l'application pour jouer aux scénarios à Nantes.
      </Title>

      <StoreButtons />
      <Marginer direction="vertical" margin="5em" />
    </ContentPageContainer>
  )
}

export default Stores
