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

const Story = ({ data, pageContext: { prev, next } }) => {
	const { story, afspMedia } = data
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopLight}
			seo={story.seoMetaTags}
		>
			<HeroStories
				data={story}
				dataMedia={afspMedia.chapterStoryUpdate}
				prev={prev}
				next={next}
			/>
			<ContentStory
				data={story}
				dataMedia={afspMedia.chapterStoryUpdate}
			/>
			<CarouselChapterContainer carouselCSS={carouselCSS} />
		</Layout>
	)
}

export default Story

export const query = graphql`
	query($slug: String) {
		story: datoCmsChapterStoryUpdate(slug: { eq: $slug }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			publicationDate(formatString: "D MMM YYYY")
			tags {
				tag
				slug
			}
			mobileCover: coverImage {
				url
				fluid(
					maxWidth: 769
					imgixParams: {
						auto: "format"
						fit: "fill"
						fill: "blur"
						w: "769"
						h: "475"
					}
				) {
					...GatsbyDatoCmsFluid_noBase64
				}
			}
			desktopCover: coverImage {
				url
				fluid(
					maxWidth: 1920
					imgixParams: {
						auto: "format"
						fit: "fill"
						fill: "blur"
						w: "1920"
						h: "768"
						blendMode: "hardlight"
						blend: "555"
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
		afspMedia: afspMedia {
			chapterStoryUpdate(filter: { slug: { eq: $slug } }) {
				article {
					... on AFSPMedia_ImageRecord {
						id
						images {
							responsiveImage(
								imgixParams: {
									auto: format
									fit: fill
									fill: blur
									h: "384"
									w: "623"
								}
							) {
								alt
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
	}
`
