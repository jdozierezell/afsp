import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Tag = ({ data: { stories, afspMedia }, pageContext: { title } }) => {
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
			<StoriesContainer
				stories={stories.edges}
				storiesMedia={afspMedia.allStories}
				more={`${title}s`}
			/>
		</Layout>
	)
}

export default Tag

export const query = graphql`
	query($slug: String, $id: [AFSPMedia_ItemId]) {
		stories: allDatoCmsStory(
			filter: { author: { elemMatch: { slug: { eq: $slug } } } }
			sort: { fields: publicationDate, order: DESC }
		) {
			edges {
				node {
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
					}
				}
			}
		}
		afspMedia: afspMedia {
			allStories(
				first: 100
				orderBy: publicationDate_DESC
				filter: { author: { anyIn: $id } }
			) {
				id
				seo {
					image {
						responsiveImage(
							imgixParams: {
								fill: blur
								fit: fill
								h: "370"
								w: "600"
							}
						) {
							alt
							aspectRatio
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
`
