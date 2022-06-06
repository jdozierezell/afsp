import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'
import customImageSize from '../utils/customImageSize'

const Detail = ({ data: { detail } }) => {
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
	detail.details.forEach(detail => {
		if (detail.__typename === 'DatoCmsImage') {
			if (
				detail.images.length === 1 &&
				detail.createCustomImageSize &&
				detail.customImageWidth &&
				detail.customImageHeight
			) {
				console.log(detail.images[0])
				detail.images[0].gatsbyImageData = customImageSize(
					detail.images[0].gatsbyImageData,
					{ width: 623, height: 384 },
					{
						width: detail.customImageWidth,
						height: detail.customImageHeight,
					}
				)
				console.log(detail.images[0].gatsbyImageData)
			}
		}
	})
	let navigation = false
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
			<NavigationSide data={detail} />
			<ContentGeneric data={detail} navigation={navigation} />
			<CarouselChapterContainer />
		</Layout>
	)
}

export default Detail

export const query = graphql`
	query ($slug: String) {
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
				alt
				gatsbyImageData(
					width: 623
					placeholder: NONE
					imgixParams: { w: "623" }
				)
			}
			brief
			parentPage {
				...ParentList
			}
			details {
				...ResourceList
				... on DatoCmsActionButton {
					__typename
					buttonText
					buttonLink
				}
				... on DatoCmsAudio {
					__typename
					audio {
						url
						title
					}
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
									auto: "format"
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
				... on DatoCmsContent {
					__typename
					contentHeading
					contentBody
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
								... on DatoCmsHeading {
									__typename
									id
									headingLevel
									heading
								}
							}
						}
					}
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
				... on DatoCmsImage {
					__typename
					id
					images {
						alt
						url
						gatsbyImageData(
							width: 623
							placeholder: NONE
							imgixParams: {
								auto: "format"
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
					imagesToShow
				}
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
				... on DatoCmsTable {
					__typename
					id
					hideHeader
					table
					tableHeader
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
