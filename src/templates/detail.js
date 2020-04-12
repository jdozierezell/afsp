import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'

import { styles } from '../css/css'

const Detail = ({ data, pageContext }) => {
	const { detail } = data
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={detail.seoMetaTags}
		>
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
				... on DatoCmsDetailSquare {
					__typename
					detail {
						__typename
						... on DatoCmsDetail {
							title
							slug
							details {
								__typename
								... on DatoCmsContent {
									__typename
									id
									contentHeading
								}
							}
						}
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
						fluid(
							maxWidth: 1280
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "1280"
								h: "720"
							}
						) {
							...GatsbyDatoCmsFluid
						}
					}
				}
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
				... on DatoCmsEmbed {
					__typename
					embedCode
				}
			}
			overrideWidth
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
	}
`
