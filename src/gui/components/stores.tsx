import React from 'react'

import Marginer from './marginer'
import { ContentPageContainer } from './pageContainer'
import StoreButtons from './StoreButtons'

const Stores = (): React.ReactElement => {
  return (
    <ContentPageContainer coloredBackground id="stores">
      <Marginer direction="vertical" margin="5em" />
      <h2 className="text-center">
        <b>ShoesNotIncluded</b> est sur les stores !
      </h2>
      <br />
      <h2 className="text-center">
        Téléchargez l&apos;<b>application mobile</b> pour jouer aux scénarios à
        Nantes.
      </h2>

      <StoreButtons />
      <Marginer direction="vertical" margin="5em" />
    </ContentPageContainer>
  )
}

export default Stores
