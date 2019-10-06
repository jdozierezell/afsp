import React from 'react'
import { css } from '@emotion/core'

import Stories from './Stories'

import { styles } from '../../css/css'

const containerCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px50};
	}
	> div {
		display: grid;
		grid-template-columns: 1fr;
		grid-row-gap: ${styles.scale.px50};
		grid-column-gap: ${styles.scale.px20};
		@media (min-width: ${styles.screens.tablet}px) {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}
		img {
			width: 100%;
		}
	}
	> h2 {
		margin-bottom: ${styles.scale.px35};
		font-size: ${styles.scale.px36};
		font-family: ${styles.fonts.paul};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px60};
			font-size: ${styles.scale.px44};
		}
	}
`

const StoriesContainer = () => {
	return (
		<section css={containerCSS}>
			<h2>Stories</h2>
			<div>
				<Stories />
				<Stories />
				<Stories />
			</div>
		</section>
	)
}

export default StoriesContainer
