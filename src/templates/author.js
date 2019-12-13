import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Tag = ({ data: { stories }, pageContext: { title } }) => {
	const heroData = {
		title: `Stories written by ${title}`,
	}
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroSolid data={heroData} />
			<StoriesContainer stories={stories.edges} more={`${title}s`} />
		</Layout>
	)
}

export default Tag

export const query = graphql`
	query($slug: String) {
		stories: allDatoCmsStory(
			filter: { author: { elemMatch: { slug: { eq: $slug } } } }
			sort: { fields: publicationDate, order: DESC }
		) {
			edges {
				node {
					title
					tags {
						tag
						slug
					}
					publicationDate(formatString: "D MMM YYYY")
					coverImage {
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
					author {
						authorName
					}
					seo {
						description
					}
				}
			}
		}
	}
`
