import React from 'react'

import styles from './pageContainer.module.scss'

export function PageContainer(props: {
  children?: React.ReactNode
}): React.ReactElement {
  return <div className={styles.pageWrapper}>{props.children}</div>
}

export function InnerPageContainer(props: {
  children?: React.ReactNode
  maxWidth?: number
}): React.ReactElement {
  const style: React.CSSProperties | undefined =
    props.maxWidth !== undefined ? { maxWidth: props.maxWidth } : undefined
  return (
    <div className={styles.innerPageContainer} style={style}>
      {props.children}
    </div>
  )
}

export function ContentPageContainer(props: {
  children?: React.ReactNode
  coloredBackground?: boolean | string
  id?: string
}): React.ReactElement {
  const isColoredBoolean = props.coloredBackground === true
  const isColoredString = typeof props.coloredBackground === 'string'
  const className = isColoredBoolean
    ? `${styles.contentPageContainer} ${styles.contentPageContainerColored}`
    : styles.contentPageContainer
  const style: React.CSSProperties | undefined = isColoredString
    ? { backgroundColor: props.coloredBackground as string }
    : undefined
  return (
    <div className={className} style={style} id={props.id}>
      {props.children}
    </div>
  )
}
