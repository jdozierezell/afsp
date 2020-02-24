import React, { useState, useEffect } from 'react'
import qs from 'qs'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSearch from '../components/Hero/HeroSearch'
import NavigationSide from '../components/Navigation/NavigationSide'
import SearchDetail from '../components/Search/SearchDetail'

import { styles } from '../css/css'

const Detail = () => {
	const [searchState, setSearchState] = useState(
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: { query: '' }
	)
	const hasQuery = searchState.query ? searchState.query : '' // running a check here prevents undefined error
	const [visibility, setVisibility] = useState(
		hasQuery.length === 0 ? 'inherit' : 'hidden'
	)

	const [searchIndices, setSearchIndices] = useState({
		details: [
			{ __typename: 'search', searchHeading: 'Pages' },
			{ __typename: 'search', searchHeading: 'Stories' },
			{ __typename: 'search', searchHeading: 'Events' },
			{ __typename: 'search', searchHeading: 'Grants' },
			{ __typename: 'search', searchHeading: 'Topics' },
			{ __typename: 'search', searchHeading: 'Authors' },
		],
	})

	const handleHeroClick = () => {
		setVisibility('inherit')
		setSearchState({ query: '' })
	}

	const handleSearchChange = event => {
		setSearchState({
			query: event.target.value,
		})
		// https://gist.github.com/excalq/2961415#gistcomment-2221360
		const params = new URLSearchParams(searchState)
		params.set('query', event.target.value)
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}?${params}`
		)
	}

	const indexResults = (hasResults, searchResults) => {
		let indexType = ''
		const tempIndices = searchIndices
		if (searchResults) {
			switch (searchResults.index) {
				case 'afsporg-page':
					indexType = 'Pages'
					break
				case 'afsporg-story':
					indexType = 'Stories'
					break
				case 'afsporg-event':
					indexType = 'Events'
					break
				case 'afsporg-grant':
					indexType = 'Grants'
					break
				case 'afsporg-tag':
					indexType = 'Topics'
					break
				case 'afsporg-author':
					indexType = 'Authors'
					break
			}
			tempIndices.details.filter(
				detail => detail.searchHeading !== indexType
			)
			tempIndices.details.forEach(detail =>
				console.log(detail.searchHeading)
			)
			console.log(tempIndices)
			console.log(indexType)
			if (hasResults) {
				tempIndices.details.push({
					__typename: 'search',
					searchHeading: indexType,
				})
			}
			setSearchIndices(tempIndices)
		} else {
			// setSearchIndices({ details: [] })
		}
	}

	useEffect(() => {
		// just hanging out to force a rerender
	}, [searchIndices])

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			{console.log(searchIndices.details)}
			<HelmetDatoCms
				seo={{
					tags: [
						{
							tagName: 'title',
							content: `Search results for ${searchState.query} | AFSP`,
						},
					],
				}}
			/>
			<HeroSearch
				data={{
					title: searchState.query,
					handleHeroClick: handleHeroClick,
					visibility: visibility,
					searchState: searchState,
				}}
			/>
			<NavigationSide data={searchIndices} navRoot={'search-results'} />
			<SearchDetail
				visibility={visibility}
				searchState={searchState}
				handleSearchChange={handleSearchChange}
				indexResults={indexResults}
			/>
		</Layout>
	)
}

export default Detail
