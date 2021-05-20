import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { YOUTUBE_PRESENTATION_VIDEO_URL } from "../../../constants";
import { StyledReactPlayer } from '../../components/common'

const AboutVideoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
    &:hover {
        color: ${({ theme }) => (theme.linkHoverColor)}; 
    }
`

const Subtitle = styled.h2`
    text-align: center;
    a {
        color: #000;
    }
`;

export function AboutVideo(props: any) {
    return (
        <AboutVideoContainer>
            <Subtitle>En quoi ça consiste ?</Subtitle>
            <StyledReactPlayer url={YOUTUBE_PRESENTATION_VIDEO_URL} />
            <Subtitle><StyledLink to="/enquoicaconsiste">Cliquez <u>ici</u> pour plus d'informations.</StyledLink></Subtitle>
        </AboutVideoContainer>
    );
}
