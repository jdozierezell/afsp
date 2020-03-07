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
			authors: allDatoCmsAuthor {
				edges {
					node {
						authorName
						slug
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
			chapterHomes: allDatoCmsChapterHomePage {
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
			customShareables: allDatoCmsCustomShareable {
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
			grants: allDatoCmsGrant {
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
			landings: allDatoCmsLanding {
				edges {
					node {
						slug
						title
					}
				}
			}
			newRecords: allDatoCmsNewRecord {
				edges {
					node {
						slug
						title
					}
				}
			}
			searchPages: allDatoCmsSearchPage {
				edges {
					node {
						slug
						title
					}
				}
			}
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
		}
	`)
	const authors = data.authors.edges
	const bios = data.bios.edges
	const chapterHomes = data.chapterHomes.edges
	const chapterStoriesUpdates = data.chapterStoriesUpdates.edges
	const customShareables = data.customShareables.edges
	const details = data.details.edges
	const detailsTagged = data.detailsTagged.edges
	const grants = data.grants.edges
	const imageLists = data.imageLists.edges
	const landings = data.landings.edges
	const newRecords = data.newRecords.edges
	const searchPages = data.searchPages.edges
	const stories = data.stories.edges
	const tags = data.tags.edges
	const redirects = data.redirects.edges

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

	bios.forEach(({ node }) => {
		createPage({
			path: `bio/${node.slug}`,
			component: path.resolve('./src/templates/bio.js'),
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

	chapterStoriesUpdates.forEach(({ node }, index) => {
		createPage({
			path: `chapter/${node.slug}`,
			component: path.resolve('./src/templates/chapterStoryUpdate.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	customShareables.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/customShareable.js'),
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

	grants.forEach(({ node }) => {
		createPage({
			path: `grant/${node.slug}`,
			component: path.resolve('./src/templates/grant.js'),
			context: {
				slug: node.slug,
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

	landings.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/landing.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	newRecords.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/newRecord.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	searchPages.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/searchPage.js'),
			context: {
				slug: node.slug,
			},
		})
	})

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
				title: node.tag,
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
}
