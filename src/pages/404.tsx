import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import { ContentContainer } from '../gui/components/common'
import Marginer from '../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../gui/components/pageContainer'

const ContentContainer404 = styled(ContentContainer)`
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`

const Custom404 = (): React.ReactElement => {
  const router = useRouter()

  useEffect(() => {
    if (router.asPath.includes('/join')) {
      router.replace('/probleme-de-redirection')
    }
  }, [router])

  return (
    <Layout
      meta={{
        title: 'Escape Game - Mentions Légales - ShoesNotIncluded',
        description:
          'Consultez les mentions légales de ShoesNotIncluded pour connaître les informations juridiques de notre site et en savoir plus sur notre application mobile.',
      }}
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>Oups ! Vous êtes perdu dans un labyrinthe sans issue ?</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <ContentContainer404 className="fs-5">
              <p>
                Whoops ! Il semble que vous soyez perdu dans un labyrinthe sans
                issue. Mais ne vous inquiétez pas, nous sommes là pour vous
                aider.
              </p>

              <p>
                Vous avez peut-être suivi une piste qui n&apos;existe plus, ou
                bien, vous avez peut-être saisi une URL erronée. Quoi qu&apos;il
                en soit, vous avez atterri sur cette page 404.
              </p>

              <p>
                Mais ne vous inquiétez pas, nous ne sommes pas des malfaiteurs
                qui vous enfermeront ici pour toujours. Nous vous invitons à
                utiliser le menu ci-dessus pour naviguer sur notre site et
                trouver le jeu d&apos;escape en plein air de vos rêves.
              </p>

              <p>
                Peut-être préféreriez-vous tenter votre chance avec un autre
                labyrinthe virtuel en utilisant notre application mobile ? Elle
                est disponible sur Apple et Android.
              </p>

              <p>
                En tout cas, n&apos;hésitez pas à nous contacter si vous avez
                besoin d&apos;aide pour sortir de cette page 404. Nous sommes là
                pour vous aider.
              </p>
            </ContentContainer404>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export default Custom404
