import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

const Detail = ({ data: { detail } }) => {
	const setEvents = events => {
		if (events) {
			setHasEvents(true)
		}
	}
	let metaImage,
		metaDescription = ''
	detail.seoMetaTags.tags.forEach(tag => {
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
		name: detail.title,
		lastReviewed: detail.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${detail.slug}`,
	}
	let navigation = false
	const [hasEvents, setHasEvents] = useState(false)
	detail.details.map(detail => {
		if (
			!navigation &&
			(detail.__typename === 'DatoCmsContent' ||
				detail.__typename === 'DatoCmsTable' ||
				detail.__typename === 'DatoCmsCardContainer' ||
				(detail.__typename === 'DatoCmsHeading' &&
					detail.headingLevel ===
						'Level 2 (will be included in sidebar)') ||
				detail.__typename === 'DatoCmsFeaturedStoryTag' ||
				detail.__typename === 'DatoCmsEventList' ||
				detail.__typename === 'search' ||
				detail.__typename === 'DatoCmsImageSectionHeader')
		) {
			navigation = true
		}
		return true
	})
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={detail.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroSolid data={detail} programLogo={detail.programLogo} />
			<NavigationSide hasEvents={hasEvents} data={detail} />
			<ContentGeneric
				setEvents={setEvents}
				data={detail}
				navigation={navigation}
			/>
			<CarouselChapterContainer />
		</Layout>
	)
}

export default Detail

export const query = graphql`
	query($slug: String) {
		detail: datoCmsDetail(slug: { eq: $slug }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			programLogo {
				url
				gatsbyImageData(width: 623, imgixParams: { w: "623" })
			}
			brief
			parentPage {
				...ParentList
			}
			details {
				... on DatoCmsEventList {
					__typename
					programName
				}
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
				... on DatoCmsDetailSquare {
					__typename
					detail {
						__typename
						... on DatoCmsDetail {
							title
							slug
							details {
								__typename
								... on DatoCmsContent {
									__typename
									id
									contentHeading
								}
							}
						}
					}
				}
				... on DatoCmsActionButton {
					__typename
					buttonText
					buttonLink
				}
				... on DatoCmsImage {
					__typename
					id
					images {
						alt
						url
						gatsbyImageData(
							width: 623
							imgixParams: {
								auto: "format"
								fill: "blur"
								fit: "fill"
								h: "384"
								w: "623"
							}
						)
					}
					imagesToShow
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
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
				... on DatoCmsEmbed {
					__typename
					embedCode
				}
				... on DatoCmsTweet {
					__typename
					tweet
				}
			}
			overrideWidth
		}
	}
`
