import React from 'react'
import styled from 'styled-components'

const BrandContainer = styled.div<{ color: string; hoverColor: string; size?: number; withShadow: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  font-family: 'CourierNew-Bold';
  font-size: ${({ size }) => (size ? size + 'rem' : '1.25rem')};
  color: ${({ color }) => (color ? color : '#000')};
  text-shadow: ${({ theme, withShadow }) => (withShadow ? theme.textShadow.default : 'none')};

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    text-shadow: ${({ theme, withShadow }) => (withShadow ? theme.textShadow.mobileXS : 'none')};
  }

  &:hover {
    color: ${({ color, hoverColor }) => (hoverColor ? hoverColor : color ? color : '#000')};

    div {
      color: ${({ color, hoverColor, theme }) => (hoverColor ? hoverColor : color ? color : theme.specialTextColor)};
    }
  }
`

const BrandNot = styled.div<{ color: string; hoverColor: string; withShadow: boolean }>`
  display: inline;
  margin-left: ${({ withShadow }) => (withShadow ? '0.3rem' : '0')};
  margin-right: ${({ withShadow }) => (withShadow ? '0.3rem' : '0')};
  color: ${({ color, theme }) => (color ? color : theme.specialTextColor)};

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    margin-left: ${({ withShadow }) => (withShadow ? '0.15rem' : '0')};
    margin-right: ${({ withShadow }) => (withShadow ? '0.15rem' : '0')};
  }
`

const Brand = (props: any) => {
  const { color, hoverColor, size, withShadow } = props

  return (
    <BrandContainer color={color} hoverColor={hoverColor} size={size} withShadow={withShadow}>
      SHOES
      <BrandNot color={color} hoverColor={hoverColor} withShadow={withShadow}>
        NOT
      </BrandNot>
      INCLUDED
    </BrandContainer>
  )
}

export default Brand
