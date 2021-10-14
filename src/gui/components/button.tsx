import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button<{ size?: number }>`
  border: none;
  outline: none;
  color: #fff;
  margin: 1.25rem;
  padding: 0.75rem;
  font-size: ${({ size }) => (size ? size + 'rem' : '1.5rem')};
  font-weight: 600;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.backgroundButtonColor};
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundHoverButtonColor};
  }

  &:focus {
    outline: none;
  }
`

const Button = ({ children, className, size, style }: { children: string | JSX.Element | JSX.Element[]; className?: string; size?: number; style?: React.CSSProperties }) => {
  return (
    <ButtonWrapper size={size} className={className} style={style}>
      {children}
    </ButtonWrapper>
  )
}

export default Button
