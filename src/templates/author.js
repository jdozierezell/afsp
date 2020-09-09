import React from 'react'
import { graphql } from 'gatsby'

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
					__typename
					id
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
								maxWidth: 200
								imgixParams: {
									auto: "format"
									fill: "blur"
									fit: "fill"
									h: "370"
									w: "600"
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
