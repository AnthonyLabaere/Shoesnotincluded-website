import styled from 'styled-components'

import conf from '../../conf'
import * as Constants from '../../constants'
import Marginer from './marginer'
import { ContentPageContainer } from './pageContainer'

import UluleLogoImg from '../../assets/images/logo-ulule.png'

const UluleLogo = styled.img`
  height: 100px;
  width: 100px;
`

// eslint-disable-next-line prettier/prettier
const CrowdfundingButtonWrapper = styled.a <{ size?: number }>`
  border: none;
  outline: none;
  color: #fff;
  margin: 1.25rem;
  padding: 0.75rem;
  font-size: ${({ size }) => (size ? size + 'rem' : '1.5rem')};
  font-weight: 600;
  border-radius: 5px;
  background-color: black;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  margin-bottom: 0;
  text-align: center;

  &:hover {
    background-color: ${() => Constants.THEME_BLACK_COLOR};
  }
`

const Crowdfunding = () => {
  if (!conf.withCrowdfunding) {
    return <></>
  }

  return (
    <ContentPageContainer coloredBackground={Constants.THEME_ORANGE_COLORS[0]}>
      <Marginer direction="vertical" margin="1em" />
      <UluleLogo src={UluleLogoImg} alt="Ulule logo" />
      <CrowdfundingButtonWrapper href="https://fr.ulule.com/shoesnotincluded-1/">Participer au crowdfunding sur Ulule</CrowdfundingButtonWrapper>
      <Marginer direction="vertical" margin="1em" />
    </ContentPageContainer>
  )
}

export default Crowdfunding
