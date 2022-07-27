import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import '../utils/facebookSDK'

import { styles } from '../css/css'
import customImageSize from '../utils/customImageSize'

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
	story.article.forEach(article => {
		if (article.__typename === 'DatoCmsImage') {
			if (
				article.images.length === 1 &&
				article.createCustomImageSize &&
				article.customImageWidth &&
				article.customImageHeight
			) {
				article.images[0].gatsbyImageData = customImageSize(
					article.images[0].gatsbyImageData,
					{ width: 623, height: 384 },
					{
						width: article.customImageWidth,
						height: article.customImageHeight,
					}
				)
			}
		}
	})
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
	query ($slug: String) {
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
			hidePublicationDate
			tags {
				tag
				slug
			}
			coverImage {
				url
				alt
				gatsbyImageData(
					width: 623
					placeholder: NONE
					imgixParams: {
						fit: "fill"
						fill: "blur"
						h: "384"
						w: "623"
					}
				)
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
						alt
						gatsbyImageData(
							width: 623
							placeholder: NONE
							imgixParams: {
								fit: "fill"
								fill: "blur"
								h: "384"
								w: "623"
							}
						)
					}
					createCustomImageSize
					customImageWidth
					customImageHeight
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
