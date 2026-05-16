import Image from 'next/image'
import React from 'react'

// https://developer.apple.com/app-store/marketing/guidelines/#section-badges
import AppleStoreBadge from '../../../public/images/apple-store-badge.svg'
// https://play.google.com/intl/en_us/badges
import GooglePlayBadge from '../../../public/images/google-play-badge.png'
import * as Constants from '../../constants'
import styles from './StoreButtons.module.scss'

const StoreButtons = (): React.ReactElement => {
  return (
    <div className={styles.storesImagesContainer}>
      <div className={styles.storeImage}>
        <a href={Constants.PLAY_STORE_LINK}>
          {/* https://play.google.com/intl/en_us/badges */}
          <Image
            priority
            src={GooglePlayBadge}
            height={100}
            alt="Google play store logo"
          />
        </a>
      </div>
      <div className={styles.storeImage}>
        <a href={Constants.APPLE_STORE_LINK}>
          {/* https://developer.apple.com/app-store/marketing/guidelines/#section-badges */}
          <Image
            priority
            src={AppleStoreBadge}
            height={100}
            alt="Apple store logo"
          />
        </a>
      </div>
    </div>
  )
}

export default StoreButtons
