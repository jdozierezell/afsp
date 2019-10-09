import React from 'react'
import { css } from '@emotion/core'

import ChapterAbout from './ChapterAbout'
import ChapterSignup from './ChapterSignup'

import { styles } from '../../css/css'

const aboutSignupCSS = css`
	display: grid;
	grid-template-columns: 1fr;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 2fr 1fr;
		grid-column-gap: ${styles.gridGap.desktop};
		margin: ${styles.scale.px50} ${styles.scale.px50};
	}
`

const ChapterAboutSignup = ({ chapterName }) => {
	return (
		<section css={aboutSignupCSS}>
			<ChapterAbout chapterName={chapterName} />
			<ChapterSignup />
		</section>
	)
}

export default ChapterAboutSignup
