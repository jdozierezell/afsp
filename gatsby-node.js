/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const { data } = await graphql(`
    query {
      articles: allDatoCmsArticle {
        edges {
          node {
            slug
          }
        }
      }
      redirects: allDatoCmsRedirect {
        edges {
          node {
            aliasUrl
            destinationUrl
          }
        }
      }
    }
  `)
  data.articles.edges.forEach(({ node }) => {
    createPage({
      path: `article/${node.slug}`,
      component: path.resolve('./src/templates/article.js'),
      context: {
        slug: node.slug,
      },
    })
  })
  data.redirects.edges.forEach(({ node }) => {
    createRedirect({
      fromPath: node.aliasUrl,
      toPath: node.destinationUrl,
      isPermanent: true,
    })
  })
}
