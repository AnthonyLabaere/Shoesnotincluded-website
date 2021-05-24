import React from "react";
import styled from "styled-components";

import { YOUTUBE_PRESENTATION_VIDEO_URL } from "../../../constants";
import { ContentContainer, StyledReactPlayer } from '../../components/common'
import { Marginer } from "../../components/marginer"
import { InnerPageContainer, PageContainer, ContentPageContainer } from '../../components/pageContainer'

const TextContainer = styled.div`
    font-size: 1.1em;
    text-align: justify;
`

function WhatIsThat() {
    return (
        <PageContainer>
            <InnerPageContainer>
                <ContentPageContainer coloredBackground>
                    <ContentContainer>
                        <h1>En quoi ça consiste ?</h1>
                    </ContentContainer>
                </ContentPageContainer>
                <ContentContainer>
                    <Marginer direction="vertical" margin="2em" />
                    <h2>Petite vidéo :</h2>
                    <StyledReactPlayer url={YOUTUBE_PRESENTATION_VIDEO_URL} />
                    <Marginer direction="vertical" margin="2em" />
                </ContentContainer>
                <ContentPageContainer coloredBackground>
                    <Marginer direction="vertical" margin="2em" />
                    <ContentContainer>
                        <h2>Pas entièrement convaincu ?</h2>
                        <h3>SHOESNOTINCLUDED, c'est un jeu reprenant fidèlement les codes de l'escape game mais en plein air.</h3>
                        <TextContainer>
                            <p>Au bout du compte, c'est un mix entre un escape game, un jeu de piste (ou geocaching) et une sorte de jeu de société.</p>
                            Mais vraiment concrètement, en quoi ça consiste ?<br />
                            <ul>
                                <li>Un jeu est constitué de plusieurs étapes.</li>
                                <li>Chaque étape correspond à un lieu donné, à trouver en résolvant une énigme.</li>
                                <li>Une fois à proximité du lieu, vous aurez automatiquement accès, via une géolocalisation, à des indices et énigmes sous la forme de cartes.</li>
                                <li>Avec les indices et l'environnement local, vous devrez alors résoudre une série d'énigme en trouvant des codes et en réussissant certaines manipulations.</li>
                                <li>Une fois tous les codes trouvés et manipulations réalisées, vous aurez alors accès à l'énigme de l'étape suivante.</li>
                            </ul>
                            <p>
                                Plus précisément, vous pouvez vous représenter chaque étape comme une salle d'un escape game.<br />
                                Ces étapes sont remplis d'indices et de codes à trouver, tout comme l'est une salle d'escape game.<br />
                                D'ailleurs, vous ne savez jamais combien exactement d'étapes un jeu contient. Alors ne trainez pas !<br />
                            </p>
                            <p>
                                La durée approximative du jeu est indiqué sur l'implication, mais vous pouvez tabler entre 60 et 90min dans la plupart des cas. Venez avec de bonnes chaussures ;)
                            </p>
                            <p>
                                Oh et un dernier détail : toutes les actions sont synchronisées entre les smartphones des différents joueurs : <b>vous pouvez jouer jusqu'à 5 sur une même partie, chacun sur votre smartphone</b> !<br />
                                Parce que pour nous, l'élément essentiel d'un escape game est <b>le travail d'équipe</b>.
                            </p>
                        </TextContainer>
                    </ContentContainer>
                    <Marginer direction="vertical" margin="2em" />
                </ContentPageContainer>
            </InnerPageContainer>
        </PageContainer >
    )
}

export default WhatIsThat;