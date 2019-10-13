import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

import background from '../SVGs/BackgroundOneBlueGreen.svg'

const titleCTACSS = css`
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	padding: ${styles.scale.px50} ${styles.scale.px24};
	text-align: center;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
	}
	h2 {
		text-align: center;
		font-size: ${styles.scale.px36};
		color: ${styles.colors.white};
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.tablet}px) {
			font-size: ${styles.scale.px56};
		}
	}
	p {
		color: ${styles.colors.white};
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		:last-of-type {
			margin-bottom: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
            margin-bottom: ${styles.scale.px80};
		}
	}
`

const CTATitle = () => {
	return (
		<div css={titleCTACSS}>
			<h2>International Survivors of Suicide Loss Day</h2>
			<p>
				Poutine truffaut chillwave, activated charcoal chicharrones af
				sriracha actually XOXO drinking vinegar vinyl taiyaki meggings
				tattooed tilde. Unicorn synth XOXO photo booth lomo, vape
				disrupt.
			</p>
			<a href="https://example.com" className="secondary-button">
				Learn more
			</a>
		</div>
	)
}

export default CTATitle
