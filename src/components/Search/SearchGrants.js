import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	Index,
	connectStateResults,
	SearchBox,
	Configure,
} from 'react-instantsearch-dom'

import SearchStateResults from '../../components/Search/SearchStateResults'
import SearchHits from '../../components/Search/SearchHits'

import { styles } from '../../css/css'

const searchClient = algoliasearch(
	'BONWJFMMRS',
	'dc6a5a451c85739a43419955d7a505c1'
)

const CustomStateResults = connectStateResults(SearchStateResults)

const searchDetailCSS = css`
	/* max-width: 623px; */
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

const indexWrapperCSS = css`
	h2 {
		margin: ${styles.scale.px36} 0 ${styles.scale.px24};
	}
`

const SearchGrants = ({ searchState, handleSearchChange, indexResults }) => {
	return (
		<div css={searchDetailCSS}>
			<InstantSearch
				indexName="afsporg-grant"
				searchClient={searchClient}
				searchState={searchState}
			>
				<SearchBox
					css={searchBoxCSS}
					onChange={handleSearchChange}
					translations={{
						placeholder: 'Start your search',
					}}
				/>
				{searchState.query !== '' && (
					<div css={indexWrapperCSS}>
						<CustomStateResults indexResults={indexResults} />
						<SearchHits />
					</div>
				)}
			</InstantSearch>
			foo
		</div>
	)
}

export default SearchGrants
