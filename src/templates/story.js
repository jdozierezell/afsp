import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import FacebookSDK from '../components/Social/FacebookSDK'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'
import FacebookComments from '../components/Social/FacebookComments'

import { styles } from '../css/css'

const Story = ({ data: { story }, pageContext: { prev, next } }) => {
	return (
		<Layout logo={styles.logo.mobileDarkDesktopLight}>
			<SEO meta={story.seoMetaTags} />
			<FacebookSDK />
			<HeroStories data={story} prev={prev} next={next} />
			<ContentStory data={story} />
			<FacebookComments />
		</Layout>
	)
}

export default Story

export const query = graphql`
	query($slug: String) {
		story: datoCmsStory(slug: { eq: $slug }) {
			title
			seoMetaTags {
				tags
			}
			publicationDate(formatString: "D MMM YYYY")
			author {
				authorName
			}
			tags {
				tag
				slug
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
						ar: 2.5
						w: "1920"
						blendMode: "hardlight"
						blend: "555"
					}
				) {
					...GatsbyDatoCmsFluid_tracedSVG
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
