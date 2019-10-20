import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'
import CarouselStoryContainer from '../components/Carousels/CarouselStoryContainer'

import { styles } from '../css/css'

const story = ({ data: { story }, pageContext: { prev, next } }) => {
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroStories story={story} prev={prev} next={next} />
			<ContentStory story={story} />
			<CarouselStoryContainer />
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
			coverImage {
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
			}
		}
	}
`

export default story
