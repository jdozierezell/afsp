import React, { useState } from 'react'
import qs from 'qs'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSearch from '../components/Hero/HeroSearch'
import SearchDetail from '../components/Search/SearchDetail'

import { styles } from '../css/css'

const SearchResults = () => {
	const [searchState, setSearchState] = useState(
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: { query: '' }
	)
	const hasQuery = searchState.query ? searchState.query : '' // running a check here prevents undefined error
	const [visibility, setVisibility] = useState(
		hasQuery.length === 0 ? 'inherit' : 'hidden'
	)

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

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms
				seo={{
					tags: [
						{
							tagName: 'title',
							content: `Search results for ${searchState.query} | AFSP`,
						},
					],
				}}
			>
				<html lang="en" />
			</HelmetDatoCms>
			<HeroSearch
				data={{
					title: searchState.query,
					handleHeroClick: handleHeroClick,
					visibility: visibility,
					searchState: searchState,
				}}
			/>
			{/* <NavigationSide data={searchIndices} navRoot={'search-results'} /> */}
			<SearchDetail
				visibility={visibility}
				searchState={searchState}
				handleSearchChange={handleSearchChange}
			/>
		</Layout>
	)
}

export default SearchResults
