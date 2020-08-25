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
						id
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
			campaignLandings: allDatoCmsCampaignLanding {
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
								introCopy
								tag {
									id
									tag
								}
							}
						}
					}
				}
			}
			embeds: allDatoCmsEmbedPage {
				edges {
					node {
						slug
						title
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
						id
						slug
						tag
					}
				}
			}
			redirects: allDatoCmsRedirect {
				edges {
					node {
						alias
						destination
					}
				}
			}
		}
	`)
	const authors = data.authors.edges
	const bios = data.bios.edges
	const campaignLandings = data.campaignLandings.edges
	const chapterHomes = data.chapterHomes.edges
	const chapterStoriesUpdates = data.chapterStoriesUpdates.edges
	const customShareables = data.customShareables.edges
	const details = data.details.edges
	const detailsTagged = data.detailsTagged.edges
	const embeds = data.embeds.edges
	const grants = data.grants.edges
	const imageLists = data.imageLists.edges
	const landings = data.landings.edges
	const newRecords = data.newRecords.edges
	const stories = data.stories.edges
	const tags = data.tags.edges
	const redirects = data.redirects.edges

	authors.forEach(({ node }) => {
		createPage({
			path: `author/${node.slug}`,
			component: path.resolve('./src/templates/author.js'),
			context: {
				id: node.id.replace('DatoCmsAuthor-', '').replace('-en', ''),
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

	campaignLandings.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/campaignLanding.js'),
			context: {
				slug: node.slug,
			},
		})
	})

	chapterHomes.forEach(({ node }) => {
		const slug = node.slug
		const tagName = `AFSP ${node.title.replace("'", '')}`
		let tagId = ''
		tags.forEach(tag => {
			tag.node.id = tag.node.id
				.replace('DatoCmsTag-', '')
				.replace('-en', '')
			if (tag.node.tag === tagName) {
				tagId = tag.node.id
			}
		})
		createPage({
			path: `chapter/${node.slug}`,
			component: path.resolve('./src/templates/chapterHome.js'),
			context: {
				slug: slug,
				tag: tagName,
				tagId: tagId,
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
		let intro = ''
		let id = ''
		node.details.forEach(detail => {
			if (detail.__typename === 'DatoCmsFeaturedStoryTag') {
				tag = detail.tag.tag
				id = detail.tag.id.replace('DatoCmsTag-', '').replace('-en', '')
				intro = detail.introCopy
			}
		})
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/detailTagged.js'),
			context: {
				slug: node.slug,
				tag: tag,
				intro: intro,
				id: id,
			},
		})
	})

	embeds.forEach(({ node }) => {
		createPage({
			path: `${node.slug}`,
			component: path.resolve('./src/templates/embed.js'),
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
				id: node.id,
			},
		})
	})

	redirects.forEach(({ node }) => {
		createRedirect({
			fromPath: node.alias,
			toPath: node.destination,
			isPermanent: true,
		})
	})
}
