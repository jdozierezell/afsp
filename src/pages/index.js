import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => {
  const data = useStaticQuery(query)
  const { edges } = data.articles
  edges.forEach(({ node }) => {
    let { article, author, seoMetaTags, slug, tags, title } = node
    // title and slug are already flat; no need to do anything there
    // article flattening
    const copyArray = [],
      authorArray = [],
      seoArray = [],
      tagsArray = []
    article.forEach((article, index) => {
      const { __typename } = article
      if (__typename === 'DatoCmsBody') {
        const { copy } = article
        const characters = 5000
        for (let i = 0; i < copy.length; i += characters) {
          copyArray.push(copy.slice(i, i + characters))
        }
      }
    })
    article = copyArray
    // author flattening
    author.forEach(author => authorArray.push(author.authorName))
    author = authorArray
    // seoMetaTags filtering and flattening
    seoMetaTags.tags.forEach(tag => {
      if (tag.tagName === 'title') {
        seoArray.push(tag.content)
      } else if (tag.tagName === 'meta') {
        const property = tag.attributes.property,
          name = tag.attributes.name
        if (property === 'og:image' || name === 'description')
          seoArray.push(tag.attributes.content)
      }
    })
    seoMetaTags = seoArray
    // tags flattening
    tags.forEach(tag => tagsArray.push(tag.tag))
    tags = tagsArray
    // return node
    node = { article, author, seoMetaTags, slug, tags, title }
    console.log(node)
  })
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}
const query = graphql`
  query {
    articles: allDatoCmsArticle {
      edges {
        node {
          slug
          title
          author {
            authorName
          }
          article {
            __typename
            ... on DatoCmsBody {
              copy
            }
          }
          tags {
            tag
          }
          seoMetaTags {
            tags
          }
        }
      }
    }
  }
`

export default IndexPage
