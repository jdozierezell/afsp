import React from 'react'
import { graphql } from 'gatsby'
import { Transition, config } from 'react-spring'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroStories from '../components/Hero/HeroStories'
import ContentStory from '../components/Content/ContentStory'

import { styles } from '../css/css'

const article = ({ data: { article }, pageContext: { prev, next } }) => {
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroStories article={article} prev={prev} next={next} />
			<ContentStory article={article} />
		</Layout>
	)
}

export const query = graphql`
	query($slug: String) {
		article: datoCmsArticle(slug: { eq: $slug }) {
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
						id
						url
						alt
					}
				}
			}
		}
	}
`

export default article
