import styled from 'styled-components'

const BrandContainer = styled.div<{ color: string; hoverColor: string; size?: number; withShadow: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  font-family: 'Oxygen-Bold';
  font-weight: bold;
  font-size: ${({ size }) => (size ? size + 'rem' : '1.25rem')};
  color: ${({ color }) => (color ? color : '#000')};

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
  const { className, color, hoverColor, withShadow } = props

  return (
    <BrandContainer className={className} color={color} hoverColor={hoverColor} withShadow={withShadow}>
      Shoes
      <BrandNot color={color} hoverColor={hoverColor} withShadow={withShadow}>
        Not
      </BrandNot>
      Included
    </BrandContainer>
  )
}

export default Brand
