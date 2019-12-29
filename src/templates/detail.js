import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'

import { styles } from '../css/css'

const Detail = ({ data, pageContext }) => {
	const { detail } = data
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={detail} />
			<HeroSolid data={detail} />
			<NavigationSide data={detail} />
			<ContentGeneric data={detail} />
		</Layout>
	)
}

export default Detail

export const query = graphql`
	query($slug: String) {
		detail: datoCmsDetail(slug: { eq: $slug }) {
			title
			slug
			brief
			parentPage {
				...ParentList
			}
			details {
				... on DatoCmsContent {
					__typename
					contentHeading
					contentBody
				}
				... on DatoCmsRecommendation {
					...Recommendation
				}
				... on DatoCmsCardContainer {
					__typename
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
				... on DatoCmsActionButton {
					__typename
					buttonText
					buttonLink
				}
				... on DatoCmsImage {
					__typename
					images {
						url
						alt
					}
				}
				... on DatoCmsVideo {
					__typename
					video {
						url
					}
					poster {
						url
					}
				}
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
			}
			seoMetaTags {
				tags
				internal {
					description
				}
			}
		}
	}
`
