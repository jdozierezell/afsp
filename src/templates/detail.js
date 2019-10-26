import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'

import { styles } from '../css/css'

const detail = ({ data, pageContext }) => {
	const { detail } = data
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={detail.seoMetaTags} />
			<HeroSolid data={detail} parents={pageContext.parents} />
			<NavigationSide data={detail} />
			<ContentGeneric data={detail} />
		</Layout>
	)
}

export const query = graphql`
	query($slug: String) {
		detail: datoCmsDetail(slug: { eq: $slug }) {
			title
			brief
			slug
			details {
				... on DatoCmsContent {
					contentHeading
					contentBody
				}
				... on DatoCmsRecommendation {
					videoTitle
					videoUrl
					storyRecommendation {
						title
						author {
							authorName
						}
					}
				}
				... on DatoCmsTable {
					tableHeading
					tableBodyNode {
						childMarkdownRemark {
							html
						}
					}
				}
				... on DatoCmsCardContainer {
					cardContainerHeading
					cardContainerList {
						cardCategory
						cardHeading
						cardBodyNode {
							internal {
								content
							}
						}
						cardButtonCta
						cardButtonUrl
					}
				}
			}
			seoMetaTags {
				tags
			}
		}
	}
`

export default detail
