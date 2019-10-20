import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'

import { styles } from '../css/css'

const story = ({ data: { story }, pageContext: { prev, next } }) => {
	return (
		<Layout logo={styles.logo.mobileDarkDesktopLight}>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroStories story={story} prev={prev} next={next} />
			<ContentStory story={story} />
		</Layout>
	)
}

export const query = graphql`
	query($slug: String) {
		story: datoCmsStory(slug: { eq: $slug }) {
			title
			publicationDate(formatString: "D MMM YYYY")
			author {
				authorName
			}
			tags {
				tag
			}
			mobileCover: coverImage {
				fluid(
					maxWidth: 769
					imgixParams: {
						fm: "jpg"
						fit: "crop"
						crop: "faces"
						w: "769"
						h: "475"
					}
				) {
					...GatsbyDatoCmsFluid_tracedSVG
				}
			}
			desktopCover: coverImage {
				fluid(
					maxWidth: 1920
					imgixParams: {
						fm: "jpg"
						fit: "crop"
						crop: "faces"
						w: "1920"
						h: "1000"
					}
				) {
					...GatsbyDatoCmsFluid_tracedSVG
				}
			}
			article {
				... on DatoCmsBody {
					copy
				}
				... on DatoCmsImage {
					images {
						url
						alt
					}
				}
				... on DatoCmsDetailExcerpt {
					detailPage {
						details {
							... on DatoCmsContent {
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

export default story
