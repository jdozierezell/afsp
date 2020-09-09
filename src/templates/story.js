import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

// import '../utils/facebookSDK'

import { styles } from '../css/css'

const carouselCSS = css`
	@media (min-width: ${styles.screens.mobile}px) {
		padding-top: 0;
		background-color: ${styles.colors.white};
		.glide__slides > div {
			border: 1px solid ${styles.colors.lightGray};
		}
	}
`

const Story = ({ data: { story }, pageContext: { prev, next } }) => {
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopLight}
			overrideLight={true}
			seo={story.seoMetaTags}
			facebook={true}
		>
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
			coverImage {
				url
				fluid(
					maxWidth: 769
					imgixParams: {
						auto: "format"
						fit: "fill"
						fill: "blur"
						h: "475"
						w: "769"
					}
				) {
					...GatsbyDatoCmsFluid
				}
			}
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
			article {
				... on DatoCmsEmbed {
					__typename
					embedCode
				}
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
							...GatsbyDatoCmsFluid
						}
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
