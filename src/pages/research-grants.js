import React, { useState } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import SearchGrants from '../components/Search/SearchGrants'

import { styles } from '../css/css'

const ResearchGrants = ({ data: { grantsPage, grants } }) => {
	const [searchState, setSearchState] = useState(
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: { query: '' }
	)
	const hasQuery = searchState.query ? searchState.query : '' // running a check here prevents undefined error
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={grantsPage.seoMetaTags} />
			<HeroSolid data={grantsPage} />
			<SearchGrants searchState={searchState} />
		</Layout>
	)
}

export default ResearchGrants

export const query = graphql`
	query {
		grantsPage: datoCmsGrantsPage {
			title
			slug
			brief
		}
		grants: allDatoCmsGrant {
			edges {
				node {
					title
					slug
					grantInformation {
						__typename
						... on DatoCmsGrantee {
							granteeName
							granteeInstitution
							granteeImage {
								url
								fluid(
									maxWidth: 400
									imgixParams: {
										auto: "format"
										fit: "crop"
										crop: "faces"
										w: "400"
										h: "400"
									}
								) {
									...GatsbyDatoCmsFluid
								}
								alt
							}
						}
						... on DatoCmsYear {
							year
						}
						... on DatoCmsMentor {
							mentor
						}
						... on DatoCmsAmount {
							amount
						}
						... on DatoCmsArea {
							area
						}
						... on DatoCmsGrantType {
							grantType
						}
					}
					grantDetails {
						__typename
						... on DatoCmsContent {
							contentHeading
							contentBody
						}
						... on DatoCmsHeading {
							headingLevel
							heading
						}
						... on DatoCmsVideo {
							video {
								url
							}
							poster {
								url
							}
						}
					}
				}
			}
		}
	}
`
