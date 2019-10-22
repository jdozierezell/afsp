import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'

import { styles } from '../css/css'

const detail = ({ data, pageContext }) => {
	const { page } = data
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={page.seoMetaTags} />
			<HeroSolid data={page} parents={pageContext.parents} />
			<NavigationSide data={page} fullPath={pageContext.fullPath} />
			<ContentGeneric data={page} />
		</Layout>
	)
}

export const query = graphql`
	query($slug: String) {
		page: datoCmsPage(slug: { eq: $slug }) {
			title
			brief
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
			}
			seoMetaTags {
				tags
			}
		}
	}
`

export default detail
