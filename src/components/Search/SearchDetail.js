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

import SearchHits from '../../components/Search/SearchHits'

import { styles } from '../../css/css'

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

const searchDetailCSS = css`
	max-width: 623px;
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const searchBoxCSS = css`
	position: relative;
	input {
		width: 100%;
		padding-top: 4px;
	}
	button {
		position: absolute;
		right: ${styles.scale.px24};
		top: ${styles.scale.px16};
		background-color: transparent;
		border: none;
		padding: 0;
		width: ${styles.scale.px24};
		height: ${styles.scale.px36};
		cursor: pointer;
	}
	svg {
		width: 20px;
		height: 20px;
	}
	.ais-SearchBox-reset {
		display: none;
	}
`

const SearchDetail = ({ visibility, searchState, handleSearchChange }) => {
	return (
		<div css={searchDetailCSS}>
			<InstantSearch
				indexName="afsporg-detail"
				searchClient={searchClient}
				searchState={searchState}
			>
				<SearchBox
					css={css`
						${searchBoxCSS};
						visibility: ${visibility};
					`}
					onChange={handleSearchChange}
					translations={{
						placeholder: 'Looking for something? We can help.',
					}}
				/>
				<CustomStateResults />
				{console.log(searchState)}
				{searchState.query !== '' && (
					<>
						<Index indexName="afsporg-detail">
							<h2>Pages</h2>
							<SearchHits />
						</Index>
						<Index indexName="afsporg-story">
							<h2>Stories</h2>
							<SearchHits />
						</Index>
					</>
				)}
			</InstantSearch>
		</div>
	)
}

export default SearchDetail
