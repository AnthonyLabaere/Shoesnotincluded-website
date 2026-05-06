import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

import styles from './common.module.scss'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export function ContentContainer(props: {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}): React.ReactElement {
  const composedClassName =
    props.className !== undefined && props.className !== ''
      ? `${styles.contentContainer} ${props.className}`
      : styles.contentContainer
  return (
    <div className={composedClassName} style={props.style}>
      {props.children}
    </div>
  )
}

export function StyledReactPlayer(props: any): React.ReactElement {
  return <ReactPlayer {...props} className={styles.styledReactPlayer} />
}

export function StyledALink({
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement {
  return (
    <a {...rest} className={styles.linkBlack}>
      {children}
    </a>
  )
}

export function StyledLink(
  props: React.ComponentProps<typeof Link>
): React.ReactElement {
  return <Link {...props} className={styles.linkBlack} />
}
