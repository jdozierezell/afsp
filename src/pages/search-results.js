import React, { useState } from 'react'
import qs from 'qs'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSearch from '../components/Hero/HeroSearch'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import SearchDetail from '../components/Search/SearchDetail'

import { styles } from '../css/css'

const Detail = () => {
	const [searchState, setSearchState] = useState(
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: { query: '' }
	)
	const [visibility, setVisibility] = useState('hidden')
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
			/>
			<HeroSearch
				data={{
					title: `Search results for ${searchState.query}`,
					handleHeroClick: handleHeroClick,
					visibility: visibility,
				}}
			/>
			{/* <NavigationSide data={detail} />
			<ContentGeneric data={detail} /> */}
			<SearchDetail
				visibility={visibility}
				searchState={searchState}
				handleSearchChange={handleSearchChange}
			/>
		</Layout>
	)
}

export default Detail
