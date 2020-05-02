import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Detail = ({ data: { tagged, stories, afspMedia }, pageContext }) => {
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
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={tagged.seoMetaTags}
		>
			<HeroSolid data={tagged} />
			<NavigationSide data={tagged} />
			<ContentGeneric data={tagged} />
			<StoriesContainer
				header={`${pageContext.tag}s`}
				intro={pageContext.intro}
				more="releases"
				stories={taggedStories}
				storiesMedia={afspMedia.allStories}
			/>
		</Layout>
	)
}

export default Detail

export const query = graphql`
	query($slug: String, $tag: String, $id: [AFSPMedia_ItemId]) {
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
						video {
							mp4Url(res: medium)
						}
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
					introCopy
					tag {
						tag
					}
				}
			}
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
		stories: allDatoCmsStory(
			filter: { tags: { elemMatch: { tag: { eq: $tag } } } }
			sort: { fields: publicationDate, order: DESC }
		) {
			totalCount
			edges {
				node {
					title
					slug
					id
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
		afspMedia: afspMedia {
			allStories(
				first: 100
				orderBy: publicationDate_DESC
				filter: { tags: { anyIn: $id } }
			) {
				id
				seo {
					image {
						responsiveImage(
							imgixParams: {
								fill: blur
								fit: fill
								h: "370"
								w: "600"
							}
						) {
							alt
							aspectRatio
							height
							sizes
							src
							srcSet
							title
							webpSrcSet
							width
						}
					}
				}
			}
		}
	}
`
