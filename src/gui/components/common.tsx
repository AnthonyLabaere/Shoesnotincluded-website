import dynamic from 'next/dynamic'
import Link from 'next/link'
import styled from 'styled-components'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export const ContentContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.deviceSizes.laptop};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;

  > * {
    width: 100%;
  }

  > h1 {
    text-align: center;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    padding: 5px;
  }
`

export const StyledReactPlayer = styled(ReactPlayer)`
  max-width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    max-width: 95%;
  }
`

export const StyledALink = styled.a`
  color: black;
  display: inline;
  text-decoration: underline;

  &:hover {
    color: #505050;
  }
`

export const StyledLink = styled(Link)`
  color: black;
  display: inline;
  text-decoration: underline;

  &:hover {
    color: #505050;
  }
`
