import ReactPlayer from 'react-player';
import styled from "styled-components";

export const ContentContainer = styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.deviceSize.laptop};
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1em;

    > * {
        width: 100%;
    }

    > h1 {
        text-align: center;
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        padding: 5px;
    }
`;

export const StyledReactPlayer = styled(ReactPlayer)`
    max-width: 100%;
    
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.mobile}) {
        max-width: 95%;
    }
`