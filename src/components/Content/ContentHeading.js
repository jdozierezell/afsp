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
	return (
		<>
			{level === 'Level 2 (will be included in sidebar)' && (
				<h2
					id={createAnchor(heading)}
					css={levelTwoHeadingCSS}
					dangerouslySetInnerHTML={{ __html: heading }}
				></h2>
			)}
			{level === 'Level 3' && (
				<h3
					css={headingCSS}
					dangerouslySetInnerHTML={{ __html: heading }}
				></h3>
			)}
			{level === 'Level 4' && (
				<h4
					css={headingCSS}
					dangerouslySetInnerHTML={{ __html: heading }}
				></h4>
			)}
			{level === 'Level 5' && (
				<h5
					css={headingCSS}
					dangerouslySetInnerHTML={{ __html: heading }}
				></h5>
			)}
			{level === 'Level 6' && (
				<h6
					css={headingCSS}
					dangerouslySetInnerHTML={{ __html: heading }}
				></h6>
			)}
		</>
	)
}

export default ContentHeading
