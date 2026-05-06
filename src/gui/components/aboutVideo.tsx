import Link from 'next/link'
import React from 'react'

import { YOUTUBE_PRESENTATION_VIDEO_URL } from '../../constants'
import Button from './button'
import { StyledReactPlayer } from './common'
import styles from './aboutVideo.module.scss'

const AboutVideo = (): React.ReactElement => {
  return (
    <div className={styles.aboutVideoContainer}>
      <h2 className="text-center mb-4">
        Présentation du concept d&apos;<b>escape game</b> :
      </h2>
      <StyledReactPlayer url={YOUTUBE_PRESENTATION_VIDEO_URL} />
      <Link href="/comment-ca-marche" className={styles.linkHover}>
        <Button>Comment ça marche un escape game sur mobile ?</Button>
      </Link>
    </div>
  )
}

export default AboutVideo
