import React, { useState } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import SearchGrants from '../components/Search/SearchGrants'

import searchURL from '../utils/searchURL'

import { styles } from '../css/css'

const ResearchGrants = ({ data: { grantsPage, grants } }) => {
	let query =
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: { query: '' }
	if (query) {
		if (query.area && typeof query.area === 'string') {
			query.area = query.area.split(',')
		}
		if (query.grantType && typeof query.grantType === 'string') {
			query.grantType = query.grantType.split(',')
		}
	}

	const [searchState, setSearchState] = useState(query)
	const handleSearchChange = event => {
		let tempSearch = searchState
		let attribute = event.target.attribute
		let value = event.target.value
		if (event.target.className === 'ais-SearchBox-input') {
			tempSearch.query = value
		} else if (attribute) {
			if (!tempSearch.refinementList) {
				tempSearch.refinementList = {}
			}
			tempSearch.refinementList[attribute] = value
		}

		setSearchState({
			...searchState,
			...tempSearch,
		})

		searchURL(tempSearch)
	}
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={grantsPage.seoMetaTags} />
			<HeroSolid data={grantsPage} />
			<SearchGrants
				searchState={searchState}
				handleSearchChange={handleSearchChange}
			/>
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
