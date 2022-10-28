import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'
import customImageSize from '../utils/customImageSize'

const DetailTagged = ({ data: { tagged, stories }, pageContext }) => {
	tagged.details.forEach(detail => {
		if (detail.__typename === 'DatoCmsImage') {
			if (
				detail.images.length === 1 &&
				detail.createCustomImageSize &&
				detail.customImageWidth &&
				detail.customImageHeight
			) {
				detail.images[0].gatsbyImageData = customImageSize(
					detail.images[0].gatsbyImageData,
					{ width: 623, height: 384 },
					{
						width: detail.customImageWidth,
						height: detail.customImageHeight,
					}
				)
			}
		}
	})
	const [taggedStories, setTaggedStories] = useState([])
	useEffect(() => {
		stories.edges.forEach(story => {
			story.node.tags.forEach(tag => {
				if (
					tag.tag === pageContext.tag &&
					story.node.publicationDate !== null
				) {
					story.node['type'] = 'story'
					setTaggedStories(taggedStories => [...taggedStories, story])
				}
			})
		})
	}, [stories, pageContext.tag])
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroSolid data={tagged} />
			<NavigationSide data={tagged} />
			<ContentGeneric data={tagged} />
			<StoriesContainer
				header={`${pageContext.tag}s`}
				intro={pageContext.intro}
				more="releases"
				stories={taggedStories}
				initialDisplay="3"
			/>
		</Layout>
	)
}

export default DetailTagged

export const Head = ({ data: { tagged } }) => {
	let metaImage,
		metaDescription = ''
	tagged.seoMetaTags.tags.forEach(tag => {
		if (tag.attributes) {
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:image'
			) {
				metaImage = tag.attributes.content
			}
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:description'
			) {
				metaDescription = tag.attributes.content
			}
		}
	})
	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'WebPage',
		about: 'suicide',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: tagged.title,
		lastReviewed: tagged.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${tagged.slug}`,
	}

	return <SEO structuredData={structuredData} meta={tagged.seoMetaTags} />
}

export const query = graphql`
	query ($slug: String, $tag: String) {
		tagged: datoCmsDetailTagged(slug: { eq: $slug }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			brief
			details {
				... on DatoCmsContent {
					__typename
					contentHeading
					contentBody
				}
				... on DatoCmsCardContainer {
					__typename
					cardContainerHeading
					cardContainerList {
						cardCategory
						cardHeading
						cardImage {
							alt
							url
							gatsbyImageData(
								width: 623
								placeholder: NONE
								imgixParams: {
									fill: "blur"
									fit: "fill"
									h: "384"
									w: "623"
								}
							)
						}
						cardBodyNode {
							internal {
								content
							}
						}
						cardButtonCta
						cardButtonUrl
					}
				}
				... on DatoCmsActionButton {
					__typename
					buttonText
					buttonLink
				}
				... on DatoCmsImage {
					__typename
					images {
						url
						gatsbyImageData(
							width: 623
							placeholder: NONE
							imgixParams: {
								fill: "blur"
								fit: "fill"
								h: "384"
								w: "623"
							}
						)
					}
					createCustomImageSize
					customImageWidth
					customImageHeight
				}
				... on DatoCmsAudio {
					__typename
					audio {
						alt
						title
						url
					}
				}
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
				... on DatoCmsEmbed {
					__typename
					embedCode
				}
				... on DatoCmsFeaturedStoryTag {
					__typename
					introCopy
					tag {
						tag
					}
				}
			}
		}
		stories: allDatoCmsStory(
			filter: { tags: { elemMatch: { tag: { eq: $tag } } } }
			sort: { fields: publicationDate, order: DESC }
		) {
			totalCount
			edges {
				node {
					__typename
					title
					slug
					publicationDate
					id
					seo {
						description
						image {
							url
							gatsbyImageData(
								width: 600
								placeholder: NONE
								imgixParams: {
									fill: "blur"
									fit: "fill"
									h: "370"
									w: "600"
								}
							)
						}
					}
					author {
						authorName
						slug
					}
					tags {
						tag
					}
				}
			}
		}
	}
`
