import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import '../utils/facebookSDK'

import { styles } from '../css/css'

const carouselCSS = css`
	@media (min-width: ${styles.screens.mobile}px) {
		background-color: ${styles.colors.white};
	}
`

const Story = ({ data: { story }, pageContext: { prev, next } }) => {
	let metaImage,
		metaDescription = ''
	story.seoMetaTags.tags.forEach(tag => {
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
	const pageUrl = `https://afsp.org/chapter/${story.slug}`
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		headline: story.title,
		datePublished: story.meta.firstPublishedAt,
		dateModified: story.meta.publishedAt,
		abstract: metaDescription,
		publisher: 'American Foundation for Suicide Prevention',
		url: pageUrl,
	}
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopLight}
			seo={story.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroStories data={story} prev={prev} next={next} />
			<ContentStory data={story} pageUrl={pageUrl} />
			<CarouselChapterContainer carouselCSS={carouselCSS} />
		</Layout>
	)
}

export default Story

export const query = graphql`
	query($slug: String) {
		story: datoCmsChapterStoryUpdate(slug: { eq: $slug }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
				firstPublishedAt
			}
			publicationDate(formatString: "D MMM YYYY")
			tags {
				tag
				slug
			}
			coverImage {
				url
				fluid(
					maxWidth: 623
					imgixParams: {
						auto: "format"
						fit: "fill"
						fill: "blur"
						h: "384"
						w: "623"
					}
				) {
					...GatsbyDatoCmsFluid_noBase64
				}
			}
			article {
				... on DatoCmsBody {
					__typename
					copy
				}
				... on DatoCmsImage {
					__typename
					id
					images {
						url
						fluid(
							maxWidth: 623
							imgixParams: {
								auto: "format"
								fit: "fill"
								fill: "blur"
								h: "384"
								w: "623"
							}
						) {
							...GatsbyDatoCmsFluid_noBase64
						}
					}
				}
				... on DatoCmsVideo {
					__typename
					id
					video {
						video {
							mp4Url(res: medium)
						}
					}
					poster {
						url
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
			}
		}
	}
`
