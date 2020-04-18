import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Tag = ({ data: { stories }, pageContext: { title } }) => {
	const heroData = {
		title: `Stories written by ${title}`,
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={{
				tags: [
					{
						tagName: 'title',
						content: `${title} | AFSP`,
					},
				],
			}}
		>
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
					slug
					tags {
						tag
						slug
					}
					publicationDate(formatString: "D MMM YYYY")
					author {
						authorName
						slug
					}
					seo {
						description
						image {
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fit: "fill"
									fill: "blur"
									w: "600"
									h: "370"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
					}
				}
			}
		}
	}
`
