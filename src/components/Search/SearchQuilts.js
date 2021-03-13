import React, { useState } from 'react'
import { css } from '@emotion/react'
import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	Index,
	connectStateResults,
	SearchBox,
	Configure,
} from 'react-instantsearch-dom'

import SearchStateResults from './SearchStateResults'
import SearchQuiltHits from './SearchQuiltHits'

import { styles } from '../../css/css'

const searchClient = algoliasearch(
	'BONWJFMMRS',
	'dc6a5a451c85739a43419955d7a505c1'
)

const CustomStateResults = connectStateResults(SearchStateResults)

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

const SearchQuilts = ({ visibility, searchState, handleSearchChange }) => {
	const [selected, setSelected] = useState(searchState.quilt)

	const handleClick = id => {
		// sets selected element for each click
		setSelected(id)
	}

	return (
		<InstantSearch
			indexName="AFSP-quilt"
			searchClient={searchClient}
			searchState={searchState}
			stalledSearchDelay={500}
		>
			<SearchBox
				css={css`
					${searchBoxCSS};
				`}
				onChange={handleSearchChange}
				translations={{
					placeholder: 'Begin typing to search.',
				}}
			/>
			<section>
				<Configure hitsPerPage={24} />
				<Index indexName="AFSP-quilt">
					<CustomStateResults />
					<SearchQuiltHits
						selected={selected}
						handleClick={handleClick}
					/>
				</Index>
			</section>
		</InstantSearch>
	)
}

export default SearchQuilts
