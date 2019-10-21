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
			tags: allDatoCmsTag {
				edges {
					node {
						slug
						tag
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
			pages: allDatoCmsPage(filter: { root: { eq: true } }) {
				edges {
					node {
						slug
						title
						treeChildren {
							slug
							title
							treeChildren {
								slug
								title
								treeChildren {
									slug
									title
								}
							}
						}
					}
				}
			}
		}
	`)
	const stories = data.stories.edges
	const tags = data.tags.edges
	const redirects = data.redirects.edges
	const pages = data.pages.edges

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

	tags.forEach(({ node }) => {
		createPage({
			path: `tag/${node.slug}`,
			component: path.resolve('./src/templates/tag.js'),
			context: {
				slug: node.slug,
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

	pages.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/detail.js'),
			context: {
				slug: node.slug,
			},
		})
		if (node.treeChildren) {
			node.treeChildren.forEach(child => {
				const fullPath = `${node.slug}/${child.slug}`
				createPage({
					path: fullPath,
					component: path.resolve('./src/templates/detail.js'),
					context: {
						slug: child.slug,
						fullPath: fullPath,
						parents: [
							{
								parentTitle: node.title,
								parentPath: `${node.slug}`,
							},
						],
					},
				})
				if (child.treeChildren) {
					child.treeChildren.forEach(grandchild => {
						const fullPath = `${node.slug}/${child.slug}/${grandchild.slug}`
						createPage({
							path: fullPath,
							component: path.resolve(
								'./src/templates/detail.js'
							),
							context: {
								slug: grandchild.slug,
								fullPath: fullPath,
								parents: [
									{
										parentTitle: node.title,
										parentPath: node.slug,
									},
									{
										parentTitle: child.title,
										parentPath: `${node.slug}/${child.slug}`,
									},
								],
							},
						})
						if (grandchild.treeChildren) {
							grandchild.treeChildren.forEach(greatGrandchild => {
								const fullPath = `${node.slug}/${child.slug}/${grandchild.slug}/${greatGrandchild.slug}`
								createPage({
									path: fullPath,
									component: path.resolve(
										'./src/templates/detail.js'
									),
									context: {
										slug: greatGrandchild.slug,
										fullPath: fullPath,
										parents: [
											{
												parentTitle: node.title,
												parentPath: node.slug,
											},
											{
												parentTitle: child.title,
												parentPath: `${node.slug}/${child.slug}`,
											},
											{
												parentTitle: grandchild.title,
												parentPath: `${node.slug}/${child.slug}/${grandchild.slug}`,
											},
										],
									},
								})
							})
						}
					})
				}
			})
		}
	})
}
