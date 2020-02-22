import React from 'react'
import { css } from '@emotion/core'
import {
	InstantSearch,
	SearchBox,
	Index,
	Hits,
	Highlight,
	connectHits,
} from 'react-instantsearch-dom'

import { styles } from '../../css/css'

const CustomHits = ({ hits }) => (
	<ol>
		{hits.map(hit => (
			<li key={hit.objectID}>
				<a href={hit.url}>{hit.title}</a>
			</li>
		))}
	</ol>
)

const SearchHits = connectHits(CustomHits)

export default SearchHits
