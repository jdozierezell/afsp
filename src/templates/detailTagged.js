import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Detail = ({ data, pageContext }) => {
	const { tagged, stories } = data
	const [taggedStories, setTaggedStories] = useState([])
	useEffect(() => {
		stories.edges.forEach(story => {
			story.node.tags.forEach(tag => {
				if (tag.tag === pageContext.tag) {
					story.node['type'] = 'story'
					setTaggedStories(taggedStories => [...taggedStories, story])
				}
			})
		})
	}, [stories, pageContext.tag])
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={tagged.seoMetaTags} />
			<HeroSolid data={tagged} />
			<NavigationSide data={tagged} />
			<ContentGeneric data={tagged} />
			<StoriesContainer
				header={`${pageContext.tag}s`}
				more="releases"
				stories={taggedStories}
			/>
		</Layout>
	)
}

export default Detail

export const query = graphql`
	query($slug: String) {
		tagged: datoCmsDetailTagged(slug: { eq: $slug }) {
			title
			slug
			brief
			details {
				... on DatoCmsContent {
					__typename
					contentHeading
					contentBody
				}
				... on DatoCmsRecommendation {
					...Recommendation
				}
				... on DatoCmsCardContainer {
					__typename
					cardContainerHeading
					cardContainerList {
						cardCategory
						cardHeading
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
						alt
					}
				}
				... on DatoCmsVideo {
					__typename
					video {
						url
					}
					poster {
						url
					}
				}
				... on DatoCmsAudio {
					__typename
					audio {
						url
						title
					}
				}
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
				... on DatoCmsFeaturedStoryTag {
					__typename
					tag {
						tag
					}
				}
			}
			seoMetaTags {
				tags
				internal {
					description
				}
			}
		}
		stories: allDatoCmsStory(
			sort: { fields: publicationDate, order: DESC }
		) {
			totalCount
			edges {
				node {
					title
					slug
					coverImage {
						url
					}
					seo {
						description
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
