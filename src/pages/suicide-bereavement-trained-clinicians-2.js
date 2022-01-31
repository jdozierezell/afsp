import React, { useState } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import SearchSbtClinicians from '../components/Search/SearchSbtClinicians'

import searchURL from '../utils/searchURL'

import { styles } from '../css/css'

import CTAContainer from '../components/CTAs/CTAContainer'

const SuicideBereavementTrainedClinicians = ({ data: { search } }) => {
	let metaImage,
		metaDescription = ''
	search.seoMetaTags.tags.forEach(tag => {
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
		about: 'suicide bereavement trained clinicians',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: search.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${search.slug}`,
	}

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
		let tempSearch = {
			refinementList: {
				state: '',
			},
		}
		let value = event.target.value

		tempSearch.refinementList.state = [value]

		setSearchState({
			...searchState,
			...tempSearch,
		})
		searchURL(tempSearch)
	}
	const [age, setAge] = useState('')
	const handleChange = event => {
		setAge(event.target.value)
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={search.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroSolid data={search} />
			<SearchSbtClinicians
				searchState={searchState}
				age={age}
				handleSearchChange={handleSearchChange}
				handleChange={handleChange}
				indexName="suicide-bereavement-trained-clinicians"
				placeholder="Find trained clinicians in your state"
				refinements={[
					{ attribute: 'state', displayAttribute: 'State' },
				]}
			/>
		</Layout>
	)
}

export default SuicideBereavementTrainedClinicians

export const query = graphql`
	query {
		search: datoCmsSearchPage(
			slug: { eq: "suicide-bereavement-trained-clinicians-2" }
		) {
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
