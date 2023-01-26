import React from 'react';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { DEVICE_SIZES } from '../../constants';
import { ContentContainer } from './common';
import { ContentPageContainer, InnerPageContainer, PageContainer } from './pageContainer';

const Image = styled.img`
  width: 40%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobileXL}) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  text-align: justify;
`;

interface BlogPageProps {
  meta: {
    title: string;
    description: string;
  };
  headerImageSource: string;
  title: string;
  children: React.ReactElement | React.ReactElement[];
}

const BlogPage = ({
  meta,
  headerImageSource,
  title,
  children
}: BlogPageProps): React.ReactElement => {
  const isMobile = useMediaQuery({ maxWidth: DEVICE_SIZES.mobileXL });

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <PageContainer>
        <InnerPageContainer>
          <ContentPageContainer coloredBackground>
            <ContentContainer>
              <h1>{title}</h1>
            </ContentContainer>
          </ContentPageContainer>
          <ContentPageContainer>
            <Image
              src={headerImageSource}
              className={(isMobile ? 'px-1' : 'px-10') + ' my-3'}
              alt={title}
            />
            <TextContainer className={'fs-5 ' + (isMobile ? 'px-1' : 'px-10')}>
              {children}
            </TextContainer>
          </ContentPageContainer>
        </InnerPageContainer>
      </PageContainer>
    </>
  );
};

export default BlogPage;
