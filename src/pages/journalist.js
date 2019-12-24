import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Detail = ({ data }) => {
	const { journalist, stories } = data
	const pressReleases = 'Press Releases'
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={journalist} />
			<HeroSolid data={journalist} />
			<NavigationSide
				data={journalist}
				afterAnchors={[pressReleases]}
				navRoot="/journalist"
			/>
			<ContentGeneric data={journalist} />
			<StoriesContainer
				header={pressReleases}
				more="releases"
				stories={stories.edges}
			/>
		</Layout>
	)
}

export default Detail

export const query = graphql`
	query {
		journalist: datoCmsJournalist {
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
					__typename
					videoTitle
					videoUrl
					storyRecommendation {
						title
						author {
							authorName
						}
					}
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
						provider
						providerUid
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
			}
			seoMetaTags {
				tags
				internal {
					description
				}
			}
		}
		stories: allDatoCmsStory(
			filter: { tags: { elemMatch: { tag: { eq: "Press Release" } } } }
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
				}
			}
		}
	}
`
