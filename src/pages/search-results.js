import React, { useState } from 'react'
import qs from 'qs'

import Layout from '../components/Layout'
import HeroSearch from '../components/Hero/HeroSearch'
import SearchDetail from '../components/Search/SearchDetail'

import { styles } from '../css/css'

const SearchResults = () => {
	const urlParams =
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: null
	const [searchState, setSearchState] = useState(
		urlParams ? { query: urlParams.query } : { query: '' }
	)
	const [source, setSource] = useState(urlParams ? urlParams.source : '')
	const hasQuery = searchState.query ? searchState.query : '' // running a check here prevents undefined error
	const [visibility, setVisibility] = useState(
		hasQuery.length === 0 ? 'inherit' : 'hidden'
	)

	const handleHeroClick = () => {
		setVisibility('inherit')
		setSource(false)
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

	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'SearchAction',
		about: 'site search',
		description: 'Displays search results from afsp.org',
		image:
			'https://www.datocms-assets.com/12810/1565360975-stackedlogocolor.jpg?w=1000&fit=max&fm=jpg',
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: `Search results for ${searchState.query} | AFSP`,
		publisher: 'American Foundation for Suicide Prevention',
		url: 'https://afsp.org/search-results',
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={{
				tags: [
					{
						tagName: 'title',
						content: `Search results for ${searchState.query} | AFSP`,
					},
				],
			}}
			structuredData={structuredData}
		>
			<HeroSearch
				data={{
					title: searchState.query,
					source: source,
					handleHeroClick: handleHeroClick,
					visibility: visibility,
					searchState: searchState,
				}}
			/>
			<SearchDetail
				visibility={visibility}
				searchState={searchState}
				handleSearchChange={handleSearchChange}
			/>
		</Layout>
	)
}

export default SearchResults
