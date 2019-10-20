import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

import background from '../SVGs/BackgroundOneBlueGreen.svg'

const titleCTACSS = css`
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	padding: ${styles.scale.px50} ${styles.scale.px24};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	h2 {
		text-align: center;
		font-size: ${styles.scale.px36};
		color: ${styles.colors.white};
		border-bottom: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
			width: 70%;
			text-align: left;
			font-size: ${styles.scale.px56};
		}
	}
`

const CTATitle = () => {
	return (
		<div css={titleCTACSS}>
			<h2>International Survivors of Suicide Loss Day</h2>
			<a href="https://example.com" className="secondary-button">
				Learn more
			</a>
		</div>
	)
}

export default CTATitle