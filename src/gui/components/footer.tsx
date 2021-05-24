import React from "react";
import { faDiscord, faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { DEVICE_SIZES, SOCIAL_NETWORKS_URLS } from "../../constants";
import { Brand } from "./brand";
import { Marginer } from "./marginer";

const GREY_COLOR = "#a3a3a3";
const GREY_HOVER_COLOR = "#666666"

const FooterContainer = styled.div`
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2em 3em;
    padding-bottom: 0;
    border-top: 0.6px solid rgb(0, 0, 0, 0.3);

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        padding: 2em 12px;
    }
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
`;

const TopContentContainer = styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.deviceSize.laptop};
`;

const ContentContainer = styled.div<{ isMobile?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    &:not(:last-of-type) {
        margin-right: 3%;
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        flex-direction: column;
    }
`;

const BottomContainer = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-top: 0.6px solid rgb(0, 0, 0, 0.3);
    padding: 0 10px;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        padding: 0;
    }
`;

const TopSubContainer = styled.span`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 1em;
    margin-right: 1em;
    text-align: justify;
    align-items: center;
`;

const Title = styled.h2`
    margin: 0;
    margin-bottom: 13px;
    color: #000;
    font-weight: 600;
    font-size: 20px;
`;

const SocialIconContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const SocialIcon = styled.div`
    color:  ${GREY_COLOR};
    font-size: 45px;
    margin: 5px;
    cursor: pointer;
    transition: background-color, 200ms ease-in-out;

    &:hover {
        color: ${GREY_HOVER_COLOR};
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        font-size: 25px;
    }
`;

const BottomSubContainer = styled.span`
    display: flex;
    align-items: center;
`;

const PrivacyText = styled.h6`
    color: ${GREY_COLOR};
    font-size: 11px;
    margin: 0;
    display: flex;
    align-items: center;
    display: inline;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        font-size: 8px;
    }
`;

const StyledLink = styled(Link)`
    color: ${GREY_COLOR};
    display: inline;
    font-size: 1.25em;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        font-size: 0.75em;
    }

    &:hover {
        color:  ${GREY_HOVER_COLOR};
    }
`;

export function Footer(props: any) {
    const isMobile = useMediaQuery({ maxWidth: DEVICE_SIZES.mobile });

    return (
        <FooterContainer>
            <TopContainer>
                <TopContentContainer>
                    <ContentContainer>
                        <TopSubContainer>
                            <Title>À propos</Title>
                            <p>SHOESNOTINCLUDED est une application mobile reprenant les codes de l'escape game mais en plein air. Les jeux vous propose de vous déplacer dans des quartiers, de fouillez l'environnement à la recherche d'indice et d'y résoudre des énigmes. L'application permet de jouer seul mais aussi de synchroniser la partie à plusieurs.</p>
                        </TopSubContainer>
                        <TopSubContainer>
                            <Title>Où jouer ?</Title>
                            <p>Les premiers jeux seront disponibles sur Nantes fin 2021 - début 2022. Des jeux seront ensuite créés dans d'autres villes de France en 2022. N'hésitez pas à nous suivre sur les réseaux sociaux pour ne pas rater les événements à venir.</p>
                        </TopSubContainer>
                    </ContentContainer>
                    <ContentContainer>
                        <TopSubContainer>
                            <Title>Suivez-nous sur les réseaux sociaux :</Title>
                            <SocialIconContainer>
                                <a href={SOCIAL_NETWORKS_URLS.discord}>
                                    <SocialIcon>
                                        <FontAwesomeIcon icon={faDiscord} />
                                    </SocialIcon>
                                </a>
                                <a href={SOCIAL_NETWORKS_URLS.facebook}>
                                    <SocialIcon>
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </SocialIcon>
                                </a>
                                <a href={SOCIAL_NETWORKS_URLS.youtube}>
                                    <SocialIcon>
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </SocialIcon>
                                </a>
                                <a href={SOCIAL_NETWORKS_URLS.twitter}>
                                    <SocialIcon>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </SocialIcon>
                                </a>
                                <a href={SOCIAL_NETWORKS_URLS.instagram}>
                                    <SocialIcon>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </SocialIcon>
                                </a>
                            </SocialIconContainer>
                        </TopSubContainer>
                    </ContentContainer>
                </TopContentContainer>
            </TopContainer>

            <BottomContainer>
                <BottomSubContainer>
                    <Link to="/">
                        <Brand size={isMobile ? 0.75 : 1.25} color={GREY_COLOR} hoverColor={GREY_HOVER_COLOR} />
                    </Link>
                    <Marginer direction="horizontal" margin={10} />
                    <PrivacyText> Marque déposée. 2021</PrivacyText>
                </BottomSubContainer>

                <BottomSubContainer>
                    <StyledLink to="/cgu">{isMobile ? 'CGU' : 'Conditions générales d\'utilisation'}</StyledLink>
                    <Marginer direction="horizontal" margin={10} />
                    <StyledLink to="/mentions-legales">Mentions légales</StyledLink>
                    <Marginer direction="horizontal" margin={10} />
                </BottomSubContainer>
            </BottomContainer>
        </FooterContainer>
    );
}
