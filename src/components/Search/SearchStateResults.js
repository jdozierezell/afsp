import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const stateResultsCSS = css`
	font-family: ${styles.fonts.avenirRegular};
`
const SearchStateResults = ({ searchState, searchResults }) => {
	let indexType = ''
	if (searchResults) {
		switch (searchResults.index) {
			case 'afsporg-page':
				indexType = 'pages'
				break
			case 'afsporg-story':
				indexType = 'stories'
				break
			case 'afsporg-event':
				indexType = 'events'
				break
			case 'afsporg-grant':
				indexType = 'grants'
				break
			case 'afsporg-tag':
				indexType = 'topics'
				break
			case 'afsporg-author':
				indexType = 'authors'
				break
		}
	}
	const hasResults =
		searchState.query !== '' && searchResults && searchResults.nbHits !== 0
	const nbHits =
		searchState.query !== '' && searchResults && searchResults.nbHits
	return (
		<div css={stateResultsCSS}>
			<div hidden={hasResults}>
				Your search returned no {indexType}. Please try searching again.
			</div>
		</div>
	)
}

export default SearchStateResults
