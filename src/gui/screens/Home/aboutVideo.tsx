import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { YOUTUBE_PRESENTATION_VIDEO_URL } from "../../../constants";
import Button from '../../components/button'
import { StyledReactPlayer } from '../../components/common'

const AboutVideoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h2`
    text-align: center;
    a {
        color: #000;
    }
`;

const StyledLink = styled(Link)`
    &:hover {
        color: ${({ theme }) => (theme.linkHoverColor)}; 
    }
`

const AboutVideo = () => {
    return (
        <AboutVideoContainer>
            <Subtitle>Vidéo de présentation :</Subtitle>
            <StyledReactPlayer url={YOUTUBE_PRESENTATION_VIDEO_URL} />
            <StyledLink to="/enquoicaconsiste"><Button>Je souhaite plus d'informations</Button></StyledLink>
        </AboutVideoContainer >
    );
}

export default AboutVideo
