import React, { useState, useEfect } from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	SearchBox,
	Hits,
	Highlight,
} from 'react-instantsearch-dom'

const searchClient = algoliasearch(
	'BONWJFMMRS',
	'dc6a5a451c85739a43419955d7a505c1'
)

const Hit = ({ hit }) => {
	return (
		<p>
			<Highlight attribute="title" hit={hit} tagName="mark" />
		</p>
	)
}

const Search = () => {
	const [hasQuery, setQuery] = useState(null)
	return (
		<InstantSearch indexName="AFSP" searchClient={searchClient}>
			<SearchBox
				onChange={e => setQuery(e.target.value)}
				translations={{ placeholder: 'Begin your search here' }}
			/>
			{hasQuery && <Hits hitComponent={Hit} />}
		</InstantSearch>
	)
}

export default Search
