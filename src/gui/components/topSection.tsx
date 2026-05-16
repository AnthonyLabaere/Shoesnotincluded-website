import Image from 'next/image'
import React from 'react'

import LandingPageImg from '../../../public/images/landing-page.jpg'
import LogoImg from '../../../public/images/logo.png'
import Brand from './brand'
import Marginer from './marginer'
import styles from './topSection.module.scss'

const TopSection = (): React.ReactElement => {
  return (
    <div className={styles.topSectionContainer}>
      <Image
        priority
        src={LandingPageImg}
        alt="People playing on the street at ShoesNotIncluded"
        className={styles.imageTopSection}
      />
      <div className={styles.backgroundFilter}>
        <div className={styles.topSectionInnerContainer}>
          <div className={styles.centeredContainer}>
            <div className={`${styles.logoImage} ${styles.logoImageMobile}`}>
              <Image
                priority
                src={LogoImg}
                alt="ShoesNotIncluded logo"
                width={400}
                height={400}
                style={{ zIndex: 1 }}
              />
            </div>
            <div className={styles.sloganContainer}>
              <Brand withShadow={true} className={styles.brandContainer} />
              <Marginer direction="vertical" margin={8} />
              <h3 className={styles.sloganText}>
                L&apos;escape game plein air
              </h3>
              <h3 className={styles.sloganText}>
                qui vous{' '}
                <span className={styles.specialText}>rassemble</span>
              </h3>
              <Marginer direction="vertical" margin={15} />
            </div>
          </div>
          <div className={`${styles.logoImage} ${styles.logoImageDesktop}`}>
            <Image
              priority
              src={LogoImg}
              alt="ShoesNotIncluded logo"
              width={400}
              height={400}
              style={{ zIndex: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopSection
