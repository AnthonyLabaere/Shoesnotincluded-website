import React from "react";
import styled from "styled-components";

import { Marginer } from "../../components/marginer";
import { ContentPageContainer } from '../../components/pageContainer'

// https://developer.apple.com/app-store/marketing/guidelines/#section-badges
import AppleStoreBadge from "../../../assets/images/apple-store-badge.svg";
// https://play.google.com/intl/en_us/badges
import GooglePlayBadge from "../../../assets/images/google-play-badge.png";

const Title = styled.h1`
    color: #000;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        font-size: 20px;
    }
`;

const StoresImagesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StoreImage = styled.div`
    margin: 1em;

    img {
        width: 20em;

        @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
            width: 10em;
        }
    }
`;

export function Stores(props: any) {
    return (
        <ContentPageContainer coloredBackground>
            <Marginer direction="vertical" margin="5em" />
            <Title>Bientôt disponible sur :</Title>
            <StoresImagesContainer>
                <StoreImage>
                    <img style={{ opacity: 0.5 }} src={GooglePlayBadge} alt="Google play store logo" />
                </StoreImage>
                <StoreImage>
                    <img style={{ opacity: 0.5 }} src={AppleStoreBadge} alt="Apple store logo" />
                </StoreImage>
            </StoresImagesContainer>
            <Marginer direction="vertical" margin="5em" />
        </ContentPageContainer>
    );
}
