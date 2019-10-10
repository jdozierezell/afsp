import React from 'react'
import { css } from '@emotion/core'

import ChapterSearchResult from './ChapterSearchResult'

import { styles } from '../../css/css'

const searchContainerCSS = css`
	padding: ${styles.scale.px20} ${styles.scale.px24} ${styles.scale.px50};
	background-color: ${styles.colors.lightGray};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
	}
	p {
		margin-bottom: ${styles.scale.px25};
	}
`

const ChapterSearchResultContainer = () => {
	return (
		<section css={searchContainerCSS}>
			<p>
				Showing results within 15 miles of <strong>10034</strong>
			</p>
			<ChapterSearchResult />
			<ChapterSearchResult />
			<ChapterSearchResult />
		</section>
	)
}

export default ChapterSearchResultContainer
