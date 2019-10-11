import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const carouselComponentCSS = css`
	margin: 0 ${styles.gridGap.desktop} 0 0;
	background-color: ${styles.colors.white};
	border-radius: 5px;
`

const carouselImageCSS = css`
	border-radius: 5px;
	margin: 0;
	@media (min-width: ${styles.screens.tablet}px) {
		border-radius: 5px 5px 0 0;
	}
`

const carouselTitleCSS = css`
	display: block;
	font-family: ${styles.fonts.avenirDemi};
	margin: ${styles.scale.px7} 0 0;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px17} ${styles.scale.px30};
	}
`

const CarouselChapter = ({ title, titleHref, src }) => {
	return (
		<div css={carouselComponentCSS}>
			<img src={src} alt="" css={carouselImageCSS} />
			<a href={titleHref} css={carouselTitleCSS}>
				{title}
			</a>
		</div>
	)
}

export default CarouselChapter
