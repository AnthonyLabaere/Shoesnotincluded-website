import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import path from 'path'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'

import Layout from '@/src/gui/components/layout'

import {
  ContentContainer,
  StyledALink,
  StyledLink,
} from '../../gui/components/common'
import Marginer from '../../gui/components/marginer'
import {
  ContentPageContainer,
  InnerPageContainer,
  PageContainer,
} from '../../gui/components/pageContainer'
import styles from './blog.module.scss'

const POSTS_DIRECTORY = path.join(process.cwd(), 'src/data/blog/articles')

const BlogArticleContentContainer = styled(ContentContainer)`
  align-items: center;
  text-align: justify;

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`
interface BlogArticleProps {
  articleData: {
    meta: {
      title: string
      description: string
    }
    title: string
    headerImageName: string
  }
  articleMarkdownContent: string
}

const BlogArticle = ({
  articleData,
  articleMarkdownContent,
}: BlogArticleProps): React.ReactElement => {
  return (
    <Layout
      meta={{
        title: articleData.meta.title,
        description: articleData.meta.description,
      }}
      noIndex
    >
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>{articleData.title}</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <BlogArticleContentContainer>
              <Image
                src={`/images/blog/${articleData.headerImageName}`}
                width={400}
                height={400}
                className={`px-10 my-3 ${styles.headerImage}`}
                alt={articleData.title}
              />
              <ReactMarkdown
                // eslint-disable-next-line react/no-children-prop
                children={articleMarkdownContent}
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ ...props }) => {
                    if (!props.href?.includes('http')) {
                      return (
                        <StyledLink
                          href={props.href as string}
                          scroll={!props.href?.includes('#')}
                        >
                          {props.children[0]}
                        </StyledLink>
                      )
                    }
                    return (
                      <StyledALink href={props.href as string}>
                        {props.children[0]}
                      </StyledALink>
                    )
                  },
                }}
              />
            </BlogArticleContentContainer>
            <Marginer direction="vertical" margin="2em" />
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </Layout>
  )
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY)

  return {
    paths: fileNames.map((fileName) => {
      return {
        params: {
          articleId: fileName.replace(/\.md$/, ''),
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { articleId: string }
}) {
  const fullPath = path.join(POSTS_DIRECTORY, `${params.articleId}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const fileContentsMatter = matter(fileContents)

  return {
    props: {
      articleData: fileContentsMatter.data,
      articleMarkdownContent: fileContentsMatter.content,
    },
  }
}

export default BlogArticle
