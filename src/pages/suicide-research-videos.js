import React, { useState } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import SearchResearch from '../components/Search/SearchResearch'

import searchURL from '../utils/searchURL'

import { styles } from '../css/css'

import CTAContainer from '../components/CTAs/CTAContainer'
// import Loadable from '@loadable/component'

// const CTAContainer = Loadable(() => import('../components/CTAs/CTAContainer'))

const SuicideResearchVideos = ({ data: { search } }) => {
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
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={search.seoMetaTags}
		>
			<HeroSolid data={search} />
			<SearchResearch
				searchState={searchState}
				handleSearchChange={handleSearchChange}
				indexName="afsporg-research-videos"
				placeholder="Start your search"
				refinements={[
					{ attribute: 'topics', displayAttribute: 'Video Topic' },
					{ attribute: 'location', displayAttribute: 'Location' },
					{
						attribute: 'interviewee',
						displayAttribute: 'Interviewee',
					},
				]}
			/>
			{search.callsToAction.map((item, index) => (
				<CTAContainer
					key={index}
					number={index}
					cta={item.cta.callToAction[0]}
				/>
			))}
		</Layout>
	)
}

export default SuicideResearchVideos

export const query = graphql`
	query {
		search: datoCmsSearchPage(slug: { eq: "suicide-research-videos" }) {
			title
			slug
			brief
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
			}
		}
	}
`
