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
			<HelmetDatoCms seo={story.seoMetaTags}>
				<meta property="fb:app_id" content="925475567867156" />
				{/* <script
					async
					defer
					type="text/javascript"
					src="https://connect.facebook.net/en_US/sdk.js"
				></script> */}
			</HelmetDatoCms>
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
				alt
				fluid(
					maxWidth: 769
					imgixParams: {
						auto: "format"
						fit: "crop"
						crop: "faces"
						w: "769"
						h: "475"
					}
				) {
					...GatsbyDatoCmsFluid
				}
			}
			desktopCover: coverImage {
				url
				alt
				fluid(
					maxWidth: 1920
					imgixParams: {
						auto: "format"
						fit: "fill"
						fill: "blur"
						crop: "faces"
						w: "1920"
						h: "540"
						blendMode: "hardlight"
						blend: "555"
					}
				) {
					...GatsbyDatoCmsFluid
				}
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
