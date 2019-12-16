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
			stories: allDatoCmsStory(
				sort: { fields: publicationDate, order: DESC }
			) {
				edges {
					node {
						slug
						title
					}
				}
			}
			chapterStoriesUpdates: allDatoCmsChapterStoryUpdate(
				sort: { fields: publicationDate, order: DESC }
			) {
				edges {
					node {
						slug
						title
					}
				}
			}
			tags: allDatoCmsTag {
				edges {
					node {
						slug
						tag
					}
				}
			}
			authors: allDatoCmsAuthor {
				edges {
					node {
						authorName
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
			details: allDatoCmsDetail {
				edges {
					node {
						slug
						title
					}
				}
			}
			landings: allDatoCmsLanding {
				edges {
					node {
						slug
						title
					}
				}
			}
			chapterHomes: allDatoCmsChapterHomePage {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	`)
	const stories = data.stories.edges
	const chapterStoriesUpdates = data.chapterStoriesUpdates.edges
	const tags = data.tags.edges
	const authors = data.authors.edges
	const redirects = data.redirects.edges
	const details = data.details.edges
	const landings = data.landings.edges
	const chapterHomes = data.chapterHomes.edges

	stories.forEach(({ node }, index) => {
		createPage({
			path: `story/${node.slug}`,
			component: path.resolve('./src/templates/story.js'),
			context: {
				slug: node.slug,
				prev: index === 0 ? null : stories[index - 1].node,
				next:
					index === stories.length - 1
						? null
						: stories[index + 1].node,
			},
		})
	})

	chapterStoriesUpdates.forEach(({ node }, index) => {
		createPage({
			path: `chapter-detail/${node.slug}`,
			component: path.resolve('./src/templates/story.js'),
			context: {
				slug: node.slug,
				prev: index === 0 ? null : stories[index - 1].node,
				next:
					index === stories.length - 1
						? null
						: stories[index + 1].node,
			},
		})
	})

	tags.forEach(({ node }) => {
		createPage({
			path: `tag/${node.slug}`,
			component: path.resolve('./src/templates/tag.js'),
			context: {
				slug: node.slug,
				title: node.tag,
			},
		})
	})

	authors.forEach(({ node }) => {
		createPage({
			path: `author/${node.slug}`,
			component: path.resolve('./src/templates/author.js'),
			context: {
				slug: node.slug,
				title: node.authorName,
			},
		})
	})

	redirects.forEach(({ node }) => {
		createRedirect({
			fromPath: node.aliasUrl,
			toPath: node.destinationUrl,
			isPermanent: true,
		})
	})

	details.forEach(({ node }) => {
		createPage({
			path: `detail/${node.slug}`,
			component: path.resolve('./src/templates/detail.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	landings.forEach(({ node }) => {
		createPage({
			path: `landing/${node.slug}`,
			component: path.resolve('./src/templates/landing.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	chapterHomes.forEach(({ node }) => {
		createPage({
			path: `chapter/${node.slug}`,
			component: path.resolve('./src/templates/chapterHome.js'),
			context: {
				slug: node.slug,
				tag: `AFSP ${node.title}`,
			},
		})
	})
}
