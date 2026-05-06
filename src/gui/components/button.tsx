import React from 'react'

import styles from './button.module.scss'

const Button = ({
  children,
  className,
  size,
  style,
  onClick,
  disabled = false,
  type = 'button',
}: {
  children: string | JSX.Element | JSX.Element[]
  className?: string
  size?: number
  style?: React.CSSProperties
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}): React.ReactElement => {
  const composedClassName =
    className !== undefined && className !== ''
      ? `${styles.buttonWrapper} ${className}`
      : styles.buttonWrapper
  const composedStyle: React.CSSProperties | undefined =
    size !== undefined
      ? { fontSize: `${size}rem`, ...(style ?? {}) }
      : style

  return (
    <button
      className={composedClassName}
      style={composedStyle}
      onClick={() => {
        if (!disabled && onClick !== undefined) {
          onClick()
        }
      }}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
