import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	Hits,
	Index,
	connectStateResults,
	SearchBox,
} from 'react-instantsearch-dom'
import qs from 'qs'

const searchClient = algoliasearch(
	'BONWJFMMRS',
	'dc6a5a451c85739a43419955d7a505c1'
)

const StateResults = ({ searchResults, searchState }) => {
	const hasResults =
		searchState.query !== '' && searchResults && searchResults.nbHits !== 0
	const nbHits =
		searchState.query !== '' && searchResults && searchResults.nbHits

	return (
		<div>
			<div hidden={!hasResults}>There are {nbHits} results</div>
			<div hidden={hasResults}>There are no results</div>
			<div>{searchState.query}</div>
		</div>
	)
}

const CustomStateResults = connectStateResults(StateResults)

const SearchDetail = ({ visibility, searchState, handleSearchChange }) => {
	return (
		<div>
			<InstantSearch
				indexName="afsporg-detail"
				searchClient={searchClient}
				searchState={searchState}
			>
				<SearchBox
					css={css`
						visibility: ${visibility};
					`}
					onChange={handleSearchChange}
				/>
				<CustomStateResults />
				{console.log(searchState)}
				{searchState.query !== '' && (
					<>
						<Index indexName="afsporg-detail">
							<h2>Pages</h2>
							<Hits />
						</Index>
						<Index indexName="afsporg-story">
							<h2>Stories</h2>
							<Hits />
						</Index>
					</>
				)}
			</InstantSearch>
		</div>
	)
}

export default SearchDetail
