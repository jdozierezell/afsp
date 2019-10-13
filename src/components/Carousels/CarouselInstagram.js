import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const carouselComponentCSS = css`
	margin: 0 ${styles.gridGap.mobile} 0 0;
	border-radius: 5px;
	min-height: 302px;
	background-position: center;
	background-size: cover;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.gridGap.desktop} 0 0;
	}
`

const CarouselInstagram = ({ title, titleHref, src }) => {
	return (
		<div
			css={css`
				${carouselComponentCSS};
				background-image: url(${src});
			`}
		></div>
	)
}

export default CarouselInstagram
