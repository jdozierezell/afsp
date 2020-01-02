import React, { useState } from 'react'
import { css } from '@emotion/core'
import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	SearchBox,
	Hits,
	Highlight,
} from 'react-instantsearch-dom'

import { styles } from '../../css/css'

const searchClient = algoliasearch(
	'BONWJFMMRS',
	'dc6a5a451c85739a43419955d7a505c1'
)

const searchCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px16};
	margin-top: ${styles.scale.px14};
	width: 100%;
	position: relative;
	input {
		width: 100%;
		border: none;
		padding-top: 4px;
	}
	button {
		position: absolute;
		right: ${styles.scale.px36};
		top: ${styles.scale.px64};
		background-color: transparent;
		border: none;
		padding: 0;
		width: ${styles.scale.px24};
		height: ${styles.scale.px36};
	}
	svg {
		width: 20px;
		height: 20px;
	}
	.ais-SearchBox-reset {
		display: none;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		margin: 0;
	}
	p {
		color: ${styles.colors.white};
		border-bottom: 2px solid ${styles.colors.white};
		padding: ${styles.scale.px12} 0;
	}
	li:last-of-type p {
		border-bottom: none;
	}
`

const Hit = ({ hit }) => {
	// console.log(hit)
	return (
		<p>
			<Highlight attribute="title" hit={hit} tagName="mark" />
		</p>
	)
}

const Search = () => {
	const [hasQuery, setQuery] = useState(null)
	return (
		<div css={searchCSS}>
			<InstantSearch indexName="AFSP" searchClient={searchClient}>
				<SearchBox
					onChange={e => setQuery(e.target.value)}
					translations={{ placeholder: 'What are you looking for?' }}
				/>
				{hasQuery && <Hits hitComponent={Hit} />}
			</InstantSearch>
		</div>
	)
}

export default Search
