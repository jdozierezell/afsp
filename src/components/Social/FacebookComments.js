import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const commentCSS = css`
	grid-column: 1 / 4;
	background: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: 0;
	}
	h2 {
		margin: 0 ${styles.scale.px24} ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			max-width: 960px;
			margin: ${styles.scale.px80} auto ${styles.scale.px60};
		}
	}
	div {
		margin: ${styles.scale.px50} ${styles.scale.px24} 0;
		width: calc(100% - 48px);
		display: block;
		@media (min-width: ${styles.screens.tablet}px) {
			width: 100%;
			max-width: 960px;
			margin: ${styles.scale.px60} auto ${styles.scale.px80};
		}
	}
`

const FacebookComments = () => {
	return (
		<aside css={commentCSS}>
			<h2>Comments</h2>
			<div
				className="fb-comments"
				data-href={window.location}
				data-width="100%"
				data-numposts="10"
			></div>
		</aside>
	)
}

export default FacebookComments
