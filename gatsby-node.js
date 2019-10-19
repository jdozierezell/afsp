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
			articles: allDatoCmsArticle(
				sort: { fields: publicationDate, order: DESC }
			) {
				edges {
					node {
						id
						slug
						title
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
	const articles = data.articles.edges
	articles.forEach(({ node }, index) => {
		createPage({
			path: `article/${node.slug}`,
			component: path.resolve('./src/templates/article.js'),
			context: {
				slug: node.slug,
				prev: index === 0 ? null : articles[index - 1].node,
				next:
					index === articles.length - 1
						? null
						: articles[index + 1].node,
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
