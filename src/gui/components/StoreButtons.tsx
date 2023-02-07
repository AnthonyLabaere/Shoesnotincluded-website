import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

// https://developer.apple.com/app-store/marketing/guidelines/#section-badges
import AppleStoreBadge from '../../../public/images/apple-store-badge.svg'
// https://play.google.com/intl/en_us/badges
import GooglePlayBadge from '../../../public/images/google-play-badge.png'
import * as Constants from '../../constants'
import { Theme } from '../../styles/theme'

const StoresImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StoreImage = styled.div`
  margin: 1rem;

  img {
    width: 20rem;
    height: auto;
    /* height: 20rem; */

    @media screen and (max-width: ${({ theme }: { theme: Theme }) =>
        theme.deviceSizes.mobileXL}) {
      width: 10rem;
    }

    @media screen and (max-width: ${({ theme }) =>
        theme.deviceSizes.mobileXS}) {
      width: 7.5rem;
    }
  }
`

const StoreButtons = (): React.ReactElement => {
  return (
    <StoresImagesContainer>
      <StoreImage>
        <a href={Constants.PLAY_STORE_LINK}>
          {/* https://developer.apple.com/app-store/marketing/guidelines/#section-badges */}
          <Image
            priority
            src={GooglePlayBadge}
            height={100}
            alt="Google play store logo"
          />
        </a>
      </StoreImage>
      <StoreImage>
        <a href={Constants.APPLE_STORE_LINK}>
          {/* https://play.google.com/intl/en_us/badges */}
          <Image
            priority
            src={AppleStoreBadge}
            height={100}
            alt="Apple store logo"
          />
        </a>
      </StoreImage>
    </StoresImagesContainer>
  )
}

export default StoreButtons
