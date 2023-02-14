import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import * as Constants from '../../constants'
import * as ScenarioFirestore from '../../firebase/firestore/scenarioFirestore'
import Button from '../../gui/components/button'
import { ContentContainer } from '../../gui/components/common'
import GameTags from '../../gui/components/GameTags'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import StoreButtons from '../../gui/components/StoreButtons'
import TextContent from '../../gui/components/TextContent'
import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker'
import * as Types from '../../types'

const ScenarioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ScenarioLogoImage = styled.div`
  flex: 1;
  padding: 5px;

  img {
    width: 350px;
    height: 350px;
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.desktop}) {
    img {
      width: 300px;
      height: 300px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.laptop}) {
    img {
      width: 250px;
      height: 250px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXS}) {
    img {
      width: 100px;
      height: 100px;
    }
  }
`

interface ScenarioProps {
  scenarioId: string
  staticScenario: Types.ScenarioDocument
}

const Scenario = ({
  scenarioId,
  staticScenario,
}: ScenarioProps): React.ReactElement => {
  const gaEventTracker = useAnalyticsEventTracker('Scenario')

  const [scenario, setScenario] =
    useState<Types.ScenarioDocument>(staticScenario)
  useEffect(() => {
    const unsubscribe = ScenarioFirestore.subscribeToScenario(
      scenarioId,
      (scenarioTmp) => {
        if (scenarioTmp !== undefined) {
          setScenario(scenarioTmp)
        }
      }
    )

    if (unsubscribe !== undefined) {
      return unsubscribe
    }
  }, [scenarioId])

  return (
    <Layout
      meta={{
        title: scenario.meta.title,
        description: scenario.meta.description,
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>{scenario.title}</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer>
              <ScenarioContainer>
                <GameTags tags={scenario.tags} large={true} />
                <div className="fs-5" style={{ textAlign: 'justify' }}>
                  <TextContent>{scenario.description}</TextContent>
                </div>
                <ScenarioLogoImage>
                  <Image
                    src={scenario.logoUrl}
                    width={350}
                    height={350}
                    alt={scenario.title}
                  />
                </ScenarioLogoImage>
              </ScenarioContainer>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer coloredBackground>
            <Marginer direction="vertical" margin="1em" />
            <ContentContainer>
              <h2 className="text-center">
                Pour y jouer rien de plus simple, téléchargez l&apos;
                <b>application mobile</b> et sélectionnez le scénario :
              </h2>
              <StoreButtons />
              <h3 className="text-center">
                Prix d&apos;une partie :{' '}
                <span style={{ textDecoration: 'line-through' }}>
                  {Constants.APP_GAME_COST}
                </span>{' '}
                <b>{Constants.WEBSITE_GAME_COST}</b> (
                {Constants.WEBSITE_TO_APP_GAME_REDUCTION_PERCENT}% de réduction
                en achetant directement sur le site) pour une <b>équipe</b>{' '}
                allant jusqu&apos;à 5 joueurs.
              </h3>
              <Link style={{ display: 'flex', flex: 1 }} href="/achat">
                <Button
                  style={{ flex: 1 }}
                  onClick={() => {
                    gaEventTracker('wish-to-buy')
                  }}
                >
                  Acheter un bon pour une partie d&apos;escape game
                </Button>
              </Link>
            </ContentContainer>
            <Marginer direction="vertical" margin="1em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export async function getStaticPaths() {
  const scenarios = await ScenarioFirestore.getScenariosFromCity('nantes')

  const paths = scenarios.map((scenario) => {
    return {
      params: {
        scenarioId: scenario.id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { scenarioId: string }
}) {
  const scenario = await ScenarioFirestore.getScenario(params.scenarioId)

  return {
    props: {
      scenarioId: params.scenarioId,
      staticScenario: scenario as Types.ScenarioDocument,
    },
  }
}

export default Scenario
