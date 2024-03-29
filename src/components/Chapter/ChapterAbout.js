import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const aboutCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 0;
	}
	h2 {
		margin: 0 0 ${styles.scale.px35};
		font-size: ${styles.scale.px36};
	}
	p {
		:last-of-type {
			margin-bottom: 0;
		}
	}
`

const ChapterAbout = ({ aboutHeading, about, addCSS }) => {
	return (
		<div
			css={css`
				${aboutCSS};
				${addCSS};
			`}
		>
			<h2>{aboutHeading}</h2>
			<div dangerouslySetInnerHTML={{ __html: about }}></div>
		</div>
	)
}

export default ChapterAbout
