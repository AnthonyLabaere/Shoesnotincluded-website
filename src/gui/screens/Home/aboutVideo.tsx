import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { YOUTUBE_PRESENTATION_VIDEO_URL } from '../../../constants';
import Button from '../../components/button';
import { StyledReactPlayer } from '../../components/common';

const AboutVideoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.linkHoverColor};
  }
`;

const AboutVideo = (): React.ReactElement => {
  return (
    <AboutVideoContainer>
      <h2 className="text-center mb-4">
        Présentation du concept d&apos;<b>escape game</b> :
      </h2>
      <StyledReactPlayer url={YOUTUBE_PRESENTATION_VIDEO_URL} />
      <StyledLink to="/enquoicaconsiste">
        <Button>Comment ça marche un escape game sur mobile ?</Button>
      </StyledLink>
    </AboutVideoContainer>
  );
};

export default AboutVideo;
