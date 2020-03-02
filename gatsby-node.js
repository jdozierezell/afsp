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
			bios: allDatoCmsBio {
				edges {
					node {
						slug
						name
					}
				}
			}
			grants: allDatoCmsGrant {
				edges {
					node {
						slug
						title
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
			detailsTagged: allDatoCmsDetailTagged {
				edges {
					node {
						slug
						title
						details {
							... on DatoCmsContent {
								__typename
							}
							... on DatoCmsRecommendation {
								__typename
							}
							... on DatoCmsCardContainer {
								__typename
							}
							... on DatoCmsActionButton {
								__typename
							}
							... on DatoCmsImage {
								__typename
							}
							... on DatoCmsVideo {
								__typename
							}
							... on DatoCmsAudio {
								__typename
							}
							... on DatoCmsHeading {
								__typename
							}
							... on DatoCmsFeaturedStoryTag {
								__typename
								tag {
									tag
								}
							}
						}
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
			imageLists: allDatoCmsImageList {
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
	const bios = data.bios.edges
	const grants = data.grants.edges
	const details = data.details.edges
	const detailsTagged = data.detailsTagged.edges
	const landings = data.landings.edges
	const chapterHomes = data.chapterHomes.edges
	const imageLists = data.imageLists.edges

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
			path: `chapter/${node.slug}`,
			component: path.resolve('./src/templates/chapterStoryUpdate.js'),
			context: {
				slug: node.slug,
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

	bios.forEach(({ node }) => {
		createPage({
			path: `bio/${node.slug}`,
			component: path.resolve('./src/templates/bio.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	grants.forEach(({ node }) => {
		createPage({
			path: `grant/${node.slug}`,
			component: path.resolve('./src/templates/grant.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	details.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/detail.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	detailsTagged.forEach(({ node }) => {
		let tag = ''
		node.details.forEach(detail => {
			if (detail.__typename === 'DatoCmsFeaturedStoryTag') {
				tag = detail.tag.tag
			}
		})
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/detailTagged.js'),
			context: {
				slug: node.slug,
				tag: tag,
			},
		})
	})

	landings.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
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

	imageLists.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/imageList.js'),
			context: {
				slug: node.slug,
			},
		})
	})
}
