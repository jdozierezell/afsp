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
	}
`

const CTAWithDescription = ({ cta }) => {
	const { heading, briefNode, linkText, linkUrl } = cta
	return (
		<div css={titleCTACSS}>
			<h2>{heading}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: briefNode.internal.content,
				}}
			></p>
			<a href={linkUrl} className="secondary-button">
				{linkText}
			</a>
		</div>
	)
}

export default CTAWithDescription
