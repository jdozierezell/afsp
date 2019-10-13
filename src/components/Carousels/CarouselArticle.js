import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const carouselComponentCSS = css`
	margin: 0 ${styles.gridGap.desktop} 0 0;
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px35} ${styles.scale.px24} ${styles.scale.px75};
	border-radius: 5px;
	position: relative;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px40} ${styles.scale.px40} ${styles.scale.px80};
	}
`

const carouselMessageCSS = css`
	@media (min-width: ${styles.screens.mobile}px) {
		font-size: ${styles.scale.px18};
	}
`

const carouselLinkCSS = css`
	position: absolute;
	bottom: ${styles.scale.px40};
	font-family: ${styles.fonts.avenirDemi};
	text-decoration: underline;
`

const CarouselArticle = ({ title, href }) => {
	return (
		<div css={carouselComponentCSS}>
			<h3 css={carouselMessageCSS}>Message</h3>
			<a href={href} css={carouselLinkCSS}>
				Learn more
			</a>
		</div>
	)
}

export default CarouselArticle
