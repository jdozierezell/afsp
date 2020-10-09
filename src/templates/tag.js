import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Tag = ({ data: { stories }, pageContext: { title, slug } }) => {
	const heroData = {
		title: `Tagged: ${title}`,
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
			<StoriesContainer stories={stories.edges} more={true} />
		</Layout>
	)
}

export default Tag

export const query = graphql`
	query($slug: String) {
		stories: allDatoCmsStory(
			filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
			limit: 66
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
					}
					seo {
						description
						image {
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fit: "crop"
									crop: "faces"
									w: "600"
									h: "370"
								}
							) {
								...GatsbyDatoCmsFluid_noBase64
							}
						}
					}
				}
			}
		}
	}
`
