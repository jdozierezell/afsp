import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

// import '../utils/facebookSDK'

import { styles } from '../css/css'

const carouselCSS = css`
	@media (min-width: ${styles.screens.mobile}px) {
		background-color: ${styles.colors.white};
	}
`

const Story = ({ data: { story }, pageContext: { prev, next } }) => {
	return (
		<Layout theme={styles.logo.mobileDarkDesktopLight} overrideLight={true}>
			<HelmetDatoCms seo={story.seoMetaTags} />
			<HeroStories data={story} prev={prev} next={next} />
			<ContentStory data={story} />
			<CarouselChapterContainer carouselCSS={carouselCSS} />
		</Layout>
	)
}

export default Story

export const query = graphql`
	query($slug: String) {
		story: datoCmsStory(slug: { eq: $slug }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			publicationDate(formatString: "D MMM YYYY")
			author {
				authorName
				slug
			}
			tags {
				tag
				slug
			}
			mobileCover: coverImage {
				url
				# fluid(
				# 	maxWidth: 769
				# 	imgixParams: {
				# 		fm: "jpg"
				# 		fit: "crop"
				# 		crop: "faces"
				# 		w: "769"
				# 		h: "475"
				# 	}
				# ) {
				# 	...GatsbyDatoCmsFluid_tracedSVG
				# }
			}
			desktopCover: coverImage {
				url
				# fluid(
				# 	maxWidth: 1920
				# 	imgixParams: {
				# 		fm: "jpg"
				# 		fit: "crop"
				# 		crop: "faces"
				# 		ar: 2.5
				# 		w: "1920"
				# 		blendMode: "hardlight"
				# 		blend: "555"
				# 	}
				# ) {
				# 	...GatsbyDatoCmsFluid_tracedSVG
				# }
			}
			article {
				... on DatoCmsBody {
					__typename
					copy
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
				... on DatoCmsDetailSquare {
					__typename
					detail {
						details {
							... on DatoCmsContent {
								__typename
								id
								contentHeading
							}
						}
						title
						slug
					}
				}
			}
		}
	}
`
