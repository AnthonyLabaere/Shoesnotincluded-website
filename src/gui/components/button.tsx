import React from 'react'
import styled from 'styled-components'

import { Theme } from '../../styles/theme'

const ButtonWrapper = styled.button<{ size?: number; disabled: boolean }>`
  border: none;
  outline: none;
  color: #fff;
  margin: 1.25rem;
  padding: 0.75rem;
  font-size: ${({ size }) => (size != null ? `${size}rem` : '1.5rem')};
  font-weight: 600;
  border-radius: 5px;
  background-color: ${({ disabled, theme }) => {
    if (disabled) {
      return theme.backgroundHoverButtonColor
    }
    return theme.backgroundButtonColor
  }};
  transition: all 200ms ease-in-out;

  ${({ disabled, theme }: { disabled: boolean; theme: Theme }) =>
    !disabled &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${theme.backgroundHoverButtonColor};
    }
  `};

  &:focus {
    outline: none;
  }
`

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
  return (
    <ButtonWrapper
      size={size}
      className={className}
      style={style}
      onClick={() => {
        if (!disabled && onClick !== undefined) {
          onClick()
        }
      }}
      disabled={disabled}
      type={type}
    >
      {children}
    </ButtonWrapper>
  )
}

export default Button
