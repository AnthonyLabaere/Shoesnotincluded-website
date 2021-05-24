import React from "react";

import { AboutVideo } from "./aboutVideo"
import { Stores } from "./stores"
import { ContentContainer } from '../../components/common'
import { Marginer } from "../../components/marginer"
import { InnerPageContainer, PageContainer } from '../../components/pageContainer'
import { TopSection } from '../../components/topSection'

function Home() {
    return (
        <PageContainer>
            <TopSection />
            <InnerPageContainer>
                <Marginer direction="vertical" margin="2em" />
                <ContentContainer>
                    <AboutVideo />
                </ContentContainer>
                <Marginer direction="vertical" margin="2em" />
                <Stores />
            </InnerPageContainer>
        </PageContainer>
    )
}

export default Home;