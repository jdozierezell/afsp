import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { Image } from 'react-datocms'

import buildUrl from '../../utils/buildUrl'

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

const CarouselChapter = ({ title, titleHref, image }) => {
	return (
		<div css={carouselComponentCSS}>
			<Image data={image} css={carouselImageCSS} />
			<Link to={buildUrl('/chapter', titleHref)} css={carouselTitleCSS}>
				{title}
			</Link>
		</div>
	)
}

export default CarouselChapter
