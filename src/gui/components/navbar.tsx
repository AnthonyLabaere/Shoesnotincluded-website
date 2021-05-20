import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { DEVICE_SIZES } from "../../constants";
import { Brand } from "./brand";
import { Marginer } from "./marginer";

import Burger from './burger';
import Menu from './menu';

import LogoImg from "../../assets/images/logo.png";

const NavbarContainer = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5em;

    border-bottom: 0.6px solid rgb(0, 0, 0, 0.3);
`;

const BrandLogoLink = styled(Link)`
    display: flex;
    flex-direction: row;
`;

const LogoImage = styled.div`
    img {
        width: 25px;
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        img {
            width: 25px;
        }
    }
`;

const AccessibilityContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuLink = styled(Link)`
    color: #000;
    font-size: 1.8em;
    
    &:hover {
        color: ${({ theme }) => (theme.linkHoverColor)};
    }
`

export function Navbar(props: any) {
    const [open, setOpen] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: DEVICE_SIZES.mobile });

    return (
        <NavbarContainer>
            <AccessibilityContainer>
                <BrandLogoLink to="/">
                    <LogoImage>
                        <img src={LogoImg} alt="SHOESNOTINCLUDED logo" />
                    </LogoImage>
                    <Brand size={isMobile ? 1 : 1.25} />
                </BrandLogoLink>
                {
                    isMobile ?
                        <>
                            <Burger open={open} setOpen={setOpen} />
                            <Menu open={open} setOpen={setOpen} />
                        </>
                        :
                        <>
                            <Marginer direction="horizontal" margin={100} />
                            <MenuLink to="/enquoicaconsiste">
                                En quoi ça consiste ?
                            </MenuLink>
                            <Marginer direction="horizontal" margin={100} />
                            <MenuLink to="/contact">
                                Contact
                            </MenuLink>
                        </>
                }
            </AccessibilityContainer>
        </NavbarContainer>
    );
}
