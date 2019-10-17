import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const defaultCardCSS = css`
	position: relative;
	background-color: ${styles.colors.white};
	border-radius: ${styles.scale.px5};
	padding: ${styles.scale.px30} ${styles.scale.px30} ${styles.scale.px150};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px40} ${styles.scale.px40} ${styles.scale.px150};
	}
	p {
		:last-of-type {
			margin-bottom: 0;
		}
	}
`

const titleCSS = css`
	font-size: ${styles.scale.px17};
	font-family: ${styles.fonts.avenirDemi};
	@media (min-width: ${styles.screens.mobile}px) {
		margin-bottom: ${styles.scale.px60};
	}
`

const subtitleCSS = css`
	font-size: ${styles.scale.px20};
	font-family: ${styles.fonts.avenirDemi};
	@media (min-width: ${styles.screens.mobile}px) {
		margin-bottom: ${styles.scale.px30};
	}
`

const ctaCSS = css`
	position: absolute;
	bottom: ${styles.scale.px40};
	@media (min-width: ${styles.screens.mobile}px) {
		bottom: ${styles.scale.px60};
	}
`

const Card = ({ title, subtitle, cta, cardCSS }) => {
	return (
		<div
			css={css`
				${defaultCardCSS};
				${cardCSS};
			`}
		>
			<h2 css={titleCSS}>{title}</h2>
			{subtitle && <h3 css={subtitleCSS}>Subtitle about grant type</h3>}
			<div>
				<p>
					Each year our research department requests applications for
					innovative, high-risk, potentially high-yield projects that
					focuses on a specific area of suicide prevention. These
					areas have been determined by AFSP and its Scientific
					Council, and reviewed and updated annually.
				</p>
				<p>
					<strong>
						Applications must submit a Letter of Intent by August
						1st to be eligible to apply.
					</strong>
				</p>
				<p>
					<a href="https://example.com">Learn more about ...</a>
				</p>
				<p>
					<a href="https://example.com">Download Policy Document</a>
				</p>
			</div>
			<a
				href="https://example.com"
				className="secondary-button"
				css={ctaCSS}
			>
				{cta}
			</a>
		</div>
	)
}

export default Card
