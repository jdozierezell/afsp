import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const stateResultsCSS = css`
	font-family: ${styles.fonts.avenirRegular};
`
const SearchStateResults = ({ searchState, searchResults }) => {
	const hasResults =
		searchState.query !== '' && searchResults && searchResults.nbHits !== 0
	const nbHits =
		searchState.query !== '' && searchResults && searchResults.nbHits
	return (
		<div css={stateResultsCSS}>
			<div hidden={hasResults}>
				Your search returned no results. Please try searching again.
			</div>
		</div>
	)
}

export default SearchStateResults
