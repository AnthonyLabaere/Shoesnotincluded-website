import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons'

import { DEVICE_SIZES } from '../../constants';
import useCurrentUser from '../../hooks/useCurrentUser';
import Brand from './brand'
import Marginer from './marginer'
import Burger from './burger'
import Menu from './menu'
import LogoImg from '../../assets/images/logo.png'

const NavbarContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;

  border-bottom: 0.6px solid rgb(0, 0, 0, 0.3);
`

const BrandLogoLink = styled(Link)`
  display: flex;
  flex-direction: row;
`

const LogoImage = styled.div`
  img {
    width: 40px;
    height: 40px;
  }
`

const AccessibilityContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuLink = styled(Link)`
  display: flex;
  flex-direction: columns;
  color: #000;
  font-size: 1.8rem;

  &:hover {
    color: ${({ theme }) => theme.linkHoverColor};
  }

  @media (max-width: ${({ theme }) => theme.deviceSizes.laptop}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    font-size: 1.2rem;
  }
`

const UserName = styled.div`
  overflow: hidden;
  max-width: 15ch;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin-right: 10px;
`

const MobileUserLink = styled(Link)`
  display: flex;
  color: black;
  position: absolute;
  right: 2rem;
`

const Navbar = () => {
  const { user } = useCurrentUser();

  const burgerRef = useRef(null)

  const [open, setOpen] = useState(false)

  const isMobileXS = useMediaQuery({ maxWidth: DEVICE_SIZES.mobileXS })
  const isMobile = useMediaQuery({ maxWidth: DEVICE_SIZES.mobileXL })
  const tablet = useMediaQuery({ maxWidth: DEVICE_SIZES.tablet })
  const laptop = useMediaQuery({ maxWidth: DEVICE_SIZES.laptop })

  let brandFontSize: number
  if (isMobileXS) {
    brandFontSize = 1.25
  } else if (isMobile) {
    brandFontSize = 1.5
  } else if (tablet) {
    brandFontSize = 1.5
  } else if (laptop) {
    brandFontSize = 1.8
  } else {
    brandFontSize = 2
  }

  return (
    <NavbarContainer>
      <AccessibilityContainer>
        <BrandLogoLink to="/">
          <LogoImage>
            <img src={LogoImg} alt="ShoesNotIncluded logo" />
          </LogoImage>
          <Brand size={brandFontSize} />
        </BrandLogoLink>
        {
          isMobile ? (
            <>
              <Burger burgerRef={burgerRef} open={open} setOpen={setOpen} />
              <Menu burgerRef={burgerRef} open={open} setOpen={setOpen} />
              <MobileUserLink style={{ display: 'flex', color: 'black', position: 'absolute', right: '2rem' }} to="/compte"><FontAwesomeIcon icon={user ? faUser : faUserSlash} size="2x" /></MobileUserLink>
            </>
          ) : (
            <>
              <Marginer direction="horizontal" margin={100} />
              <MenuLink to="/scenarios">{"Les scénarios"}</MenuLink>
              <Marginer direction="horizontal" margin={100} />
              <MenuLink to="/enquoicaconsiste">{"En quoi ça consiste ?"}</MenuLink>
              <Marginer direction="horizontal" margin={100} />
              <MenuLink to="/faq">FAQ</MenuLink>
              <Marginer direction="horizontal" margin={100} />
              <MenuLink to="/contact">Contact</MenuLink>
              <Marginer direction="horizontal" margin={100} />
              <MenuLink to="/compte" style={{ display: 'flex', alignItems: 'center' }}>
                <UserName>{user ? user.displayName : "Mon compte"}</UserName> <FontAwesomeIcon icon={user ? faUser : faUserSlash} size="1x" />
              </MenuLink>
              <Marginer direction="horizontal" margin={100} />
            </>
          )}
      </AccessibilityContainer>
    </NavbarContainer>
  )
}

export default Navbar
