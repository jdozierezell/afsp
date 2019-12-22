import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

import background from '../SVGs/BackgroundOneBlueGreen.svg'

const h2 = css`
	text-align: center;
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px40};
	@media (min-width: ${styles.screens.tablet}px) {
		width: 70%;
		text-align: left;
		font-size: ${styles.scale.px56};
		margin-bottom: 0;
	}
`

const CTANoDescription = ({ cta }) => {
	const { heading, linkText, linkUrl } = cta
	return (
		<>
			<h2 css={h2}>{heading}</h2>
			<a href={linkUrl} className="secondary-button">
				{linkText}
			</a>
		</>
	)
}

export default CTANoDescription
