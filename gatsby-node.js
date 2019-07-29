/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      articles: allDatoCmsArticle {
        edges {
          node {
            slug
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
}
