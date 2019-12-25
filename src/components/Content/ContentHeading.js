import React from 'react'
import { css } from '@emotion/core'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

const levelTwoHeadingCSS = css`
	font-size: ${styles.scale.px36};
	margin: ${styles.scale.px50} 0 ${styles.scale.px35};
	@media (min-width: ${styles.screens.mobile}px) {
		${styles.scale.px44};
		margin: ${styles.scale.px80} 0 ${styles.scale.px40};
	}
`

const headingCSS = css`
	margin-top: ${styles.scale.px24};
`

const ContentHeading = ({ heading, level }) => {
	switch (level) {
		case 'Level 2 (will be included in sidebar)':
			return (
				<h2 id={createAnchor(heading)} css={levelTwoHeadingCSS}>
					{heading}
				</h2>
			)
			break
		case 'Level 3':
			return <h3 css={headingCSS}>{heading}</h3>
			break
		case 'Level 4':
			return <h4 css={headingCSS}>{heading}</h4>
			break
		case 'Level 5':
			return <h5 css={headingCSS}>{heading}</h5>
			break
		case 'Level 6':
			return <h6 css={headingCSS}>{heading}</h6>
			break
	}
}

export default ContentHeading
