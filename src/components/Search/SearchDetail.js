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

const SearchDetail = ({
	visibility,
	searchState,
	handleSearchChange,
	indexResults,
}) => {
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
				{searchState.query !== '' && (
					<div css={indexWrapperCSS}>
						<Configure hitsPerPage={10} />
						<Index indexName="AFSP">
							<CustomStateResults indexResults={indexResults} />
							<SearchHits />
						</Index>
						{/* <Index indexName="afsporg-story">
							<CustomStateResults indexResults={indexResults} />
							<SearchHits />
						</Index>
						<Index indexName="afsporg-event">
							<CustomStateResults indexResults={indexResults} />
							<SearchHits />
						</Index>
						<Index indexName="afsporg-grant">
							<CustomStateResults indexResults={indexResults} />
							<SearchHits />
						</Index>
						<Index indexName="afsporg-tag">
							<CustomStateResults indexResults={indexResults} />
							<SearchHits />
						</Index>
						<Index indexName="afsporg-author">
							<CustomStateResults indexResults={indexResults} />
							<SearchHits />
						</Index> */}
					</div>
				)}
			</InstantSearch>
		</div>
	)
}

export default SearchDetail