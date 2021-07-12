import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'

import Embed from '../Embed/Embed'

import { styles } from '../../css/css'

const ctaImageCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: flex;
		align-content: top;
		grid-column: 2 / 3;
	}
	img {
		width: 100%;
		height: auto !important;
	}
`

const formCSS = css`
	margin: ${styles.scale.px36} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px36} 0 0;
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}
`

const embedCSS = css`
	margin: ${styles.scale.px24} 0 !important;
`

const EmailLanding = ({ callToAction, callToActionImage, embedHtml }) => {
	const emailBodyCSS = css`
		display: grid;
		grid-template-columns: 1fr;
		margin: ${styles.scale.px126} ${styles.scale.px24} 0;
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px180} ${styles.scale.px50}
				${styles.scale.px24};
		}
		@media (min-width: ${styles.screens.tablet}px) {
			grid-template-columns: ${callToActionImage ? `1fr 1fr` : `1fr`};
		}
	`
	return (
		<section css={emailBodyCSS}>
			{callToActionImage && (
				<GatsbyImage
					image={callToActionImage.gatsbyImageData}
					alt={callToActionImage.alt}
					css={ctaImageCSS}
				/>
			)}
			<div css={formCSS}>
				<div dangerouslySetInnerHTML={{ __html: callToAction }}></div>
				<Embed
					embed={embedHtml}
					embedCSS={css`
						${embedCSS};
					`}
				></Embed>
			</div>
		</section>
	)
}

export default EmailLanding
