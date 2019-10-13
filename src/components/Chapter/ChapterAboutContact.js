import React from 'react'
import { css } from '@emotion/core'

import ChapterAbout from './ChapterAbout'
import ChapterContact from './ChapterContact'

import { styles } from '../../css/css'

const aboutContactCSS = css`
	display: grid;
	grid-template-columns: 1fr;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 2fr 1fr;
		grid-column-gap: ${styles.scale.px46};
		margin: ${styles.scale.px50} ${styles.scale.px50};
		align-items: flex-start;
	}
`

const aboutCSS = css`
	grid-row: 2 / 3;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}
`

const contactCSS = css`
	grid-row: 1 / 2;
	@media (min-width: ${styles.screens.tablet}px) {
	}
`

const ChapterAboutContact = ({ chapterName }) => {
	return (
		<section css={aboutContactCSS}>
			<ChapterAbout chapterName={chapterName} addCSS={aboutCSS} />
			<ChapterContact addCSS={contactCSS} />
		</section>
	)
}

export default ChapterAboutContact
