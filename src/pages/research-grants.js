import React, { useState } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import SearchResearch from '../components/Search/SearchResearch'

import searchURL from '../utils/searchURL'

import { styles } from '../css/css'

const ResearchGrants = ({ data: { grantsPage } }) => {
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
		if (event.target[0]) {
			if (event.target[0].className === 'ais-SearchBox-input') {
				tempSearch.query = event.target[0].value
			}
		} else {
			let attribute = event.target.attribute
			if (attribute) {
				if (!tempSearch.refinementList) {
					tempSearch.refinementList = {}
				}
				tempSearch.refinementList[attribute] = event.target.value
			}
		}
		setSearchState({
			...searchState,
			...tempSearch,
		})
		searchURL(tempSearch)
	}
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroSolid data={grantsPage} />
			<SearchResearch
				searchState={searchState}
				setSearchState={setSearchState}
				handleSearchChange={handleSearchChange}
				indexName="afsporg-grant"
				placeholder="Start your search"
				refinements={[
					{ attribute: 'area', displayAttribute: 'Research Area' },
					{ attribute: 'grantType', displayAttribute: 'Grant Type' },
					{ attribute: 'year', displayAttribute: 'Grant Year' },
				]}
			/>
		</Layout>
	)
}

export default ResearchGrants

export const Head = ({ data: { grantsPage } }) => {
	let metaImage,
		metaDescription = ''

	grantsPage.seoMetaTags.tags.forEach(tag => {
		if (tag.attributes) {
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:image'
			) {
				metaImage = tag.attributes.content
			}
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:description'
			) {
				metaDescription = tag.attributes.content
			}
		}
	})

	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'SearchAction',
		about: 'suicide research grants',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: grantsPage.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${grantsPage.slug}`,
	}
	return <SEO structuredData={structuredData} meta={grantsPage.seoMetaTags} />
}

export const query = graphql`
	query {
		grantsPage: datoCmsGrantsPage {
			title
			slug
			brief
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
	}
`
