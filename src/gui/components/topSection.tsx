import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import { DEVICE_SIZES } from "../../constants";
import { Brand } from "./brand";
import { Marginer } from "./marginer";

import LogoImg from "../../assets/images/logo.png";
import TopSectionBackgroundImg from "../../assets/images/landing-page.jpg";

const TopSectionContainer = styled.div`
    width: 100%;
    height: 800px;
    background: url(${TopSectionBackgroundImg}) no-repeat;
    background-position: 0px -150px;
    background-size: cover;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        height: 700px;
        background-position: -315px 0px;
    }
`;

const BackgroundFilter = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(180, 220, 220, 0.5);
    display: flex;
    flex-direction: column;
`;

const TopSectionInnerContainer = styled.div`
    width: 100%;
    height: 800px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 5em;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        height: 700px;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    flex: 3;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

const LogoImage = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    filter: drop-shadow(0 0 2rem #fff);

    img {
        width: 400px;
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        align-items: flex-end;
        img {
            width: 160px;
        }
    }
`;

const SloganText = styled.h3`
    margin: 0;
    line-height: 1.4;
    color: #000;
    text-shadow: ${({ theme }) => theme.textShadow};
    font-size: 50px;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        font-size: 24px;
    }
`;

export function TopSection(props: any) {
    const isMobile = useMediaQuery({ maxWidth: DEVICE_SIZES.mobile });

    return (
        <TopSectionContainer>
            <BackgroundFilter>
                <TopSectionInnerContainer>
                    <LogoContainer>
                        {isMobile && (
                            <LogoImage>
                                <img src={LogoImg} alt="SHOESNOTINCLUDED logo" />
                            </LogoImage>
                        )}
                        <Brand size={isMobile ? 2.2 : 3.5} withShadow={true}></Brand>
                        <Marginer direction="vertical" margin={8} />
                        <SloganText>L'escape game plein air</SloganText>
                        <SloganText>qui vous <span style={{ color: 'red' }}>rassemble</span></SloganText>
                        <Marginer direction="vertical" margin={15} />
                    </LogoContainer>
                    {!isMobile && (
                        <LogoImage>
                            <img src={LogoImg} alt="SHOESNOTINCLUDED logo" />
                        </LogoImage>
                    )}
                </TopSectionInnerContainer>
            </BackgroundFilter>
        </TopSectionContainer>
    );
}
