import React from 'react'

import styles from './brand.module.scss'

interface BrandProps {
  className?: string
  color?: string
  hoverColor?: string
  size?: number
  withShadow?: boolean
}

const Brand = ({
  className,
  color,
  hoverColor,
  size,
  withShadow = false,
}: BrandProps): React.ReactElement => {
  const childHoverColor = hoverColor ?? color
  const containerStyle: React.CSSProperties = {
    ...(size !== undefined ? { fontSize: `${size}rem` } : null),
    ...(color !== undefined ? { color } : null),
    ...(childHoverColor !== undefined
      ? ({ ['--brand-hover-color']: childHoverColor } as Record<string, string>)
      : null),
  } as React.CSSProperties

  const notStyle: React.CSSProperties = {
    ...(color !== undefined ? { color } : null),
    ...(childHoverColor !== undefined
      ? ({
          ['--brand-not-hover-color']: childHoverColor,
        } as Record<string, string>)
      : null),
    ...(withShadow
      ? ({
          ['--brand-not-margin']: '0.3rem',
          ['--brand-not-margin-sm']: '0.15rem',
        } as Record<string, string>)
      : null),
  } as React.CSSProperties

  const composedClassName =
    className !== undefined && className !== ''
      ? `${styles.brandContainer} ${className}`
      : styles.brandContainer

  return (
    <div className={composedClassName} style={containerStyle}>
      Shoes
      <div className={styles.brandNot} style={notStyle}>
        Not
      </div>
      Included
    </div>
  )
}

export default Brand
