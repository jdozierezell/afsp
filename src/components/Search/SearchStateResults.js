import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const stateResultsCSS = css`
	font-family: ${styles.fonts.avenirRegular};
`
const SearchStateResults = ({ searchState, searchResults }) => {
	const hasResults =
		searchState.query !== '' && searchResults && searchResults.nbHits !== 0

	return (
		<div css={stateResultsCSS}>
			<div hidden={hasResults}>
				We're sorry. Your search returned no results. Please try
				searching again.
			</div>
		</div>
	)
}

export default SearchStateResults
