import React from 'react'
import { css } from '@emotion/core'

import SearchChapters from './SearchChapters'
import SearchSupportGroups from './SearchSupportGroups'

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

const SearchModelContainer = ({ chapters, supportGroups, radius, zip }) => {
	return (
		<section css={searchContainerCSS}>
			<p>
				Showing results within {radius} miles of <strong>{zip}</strong>
			</p>
			{chapters &&
				chapters.map((chapter, index) => {
					return <SearchChapters key={index} chapter={chapter} />
				})}
			{supportGroups &&
				chapters.map((chapter, index) => {
					return <SearchSupportGroups key={index} chapter={chapter} />
				})}
		</section>
	)
}

export default SearchModelContainer
