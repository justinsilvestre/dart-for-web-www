import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import config from '../../data/SiteConfig'
import TableOfContents from '../components/Layout/TableOfContents'

export default class LessonTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug
    const post = postNode.frontmatter
    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }
    const postContext = post.context
    let chapterTitles
    switch (postContext) {
      case 'dart30':
        chapterTitles = config.dart30Titles
        break
      case 'language-tour':
        chapterTitles = config.langugaeTourChapters
        break
      default:
        chapterTitles = ['']
        break
    }
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader location={this.props.location} />
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents
              posts={this.props.data.allPostTitles.edges}
              contentsType="lesson"
              chapterTitles={chapterTitles}
              context={postContext}
            />
          </ToCContainer>
          <BodyContainer>
            <div className="Lesson">
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </div>
          </BodyContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 300px 1fr;
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};

  .Lesson {
    padding-bottom: 100px;

    img {
      margin: 15px auto;
      box-shadow: 2px 2px 8px #c9c9c9;
    }
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${props => props.theme.lightGrey};
  overflow: scroll;
`

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query LessonBySlug($slug: String!) {
    allPostTitles: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            lesson
            chapter
            type
            context
          }
          fields {
            slug
          }
        }
      }
    }
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
        context
        type
      }
      fields {
        slug
      }
    }
  }
`
