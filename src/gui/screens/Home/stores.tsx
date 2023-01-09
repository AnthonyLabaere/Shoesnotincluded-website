import Marginer from '../../components/marginer'
import { ContentPageContainer } from '../../components/pageContainer'
import StoreButtons from '../../components/StoreButtons'

const Stores = () => {
  return (
    <ContentPageContainer coloredBackground id="stores">
      <Marginer direction="vertical" margin="5em" />
      <h2 className="text-center">
        ShoesNotIncluded est sur les stores !
      </h2>
      <br/>
      <h2 className="text-center">
        Téléchargez l'application pour jouer aux scénarios à Nantes.
      </h2>

      <StoreButtons />
      <Marginer direction="vertical" margin="5em" />
    </ContentPageContainer>
  )
}

export default Stores
