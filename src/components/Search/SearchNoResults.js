import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const noResultsCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const SearchNoResults = ({ type }) => {
	return (
		<div css={noResultsCSS}>
			<p>
				We're sorry. Your search returned no {type}s. Please try
				searching again.
			</p>
		</div>
	)
}

export default SearchNoResults
