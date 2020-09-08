import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const carouselComponentCSS = css`
	display: block;
	background-color: ${styles.colors.white};
	border-radius: 5px;
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 ${styles.gridGap.mobile} 0 0;
	}
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
	padding: ${styles.scale.px7} 0 0;
	color: ${styles.colors.poppy};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px17} ${styles.scale.px30};
	}
`

const CarouselChapter = ({ title, titleHref, image }) => {
	return (
		<Link css={carouselComponentCSS} to={buildUrl('/chapter', titleHref)}>
			<Img fluid={image} css={carouselImageCSS} />
			<p css={carouselTitleCSS}>{title}</p>
		</Link>
	)
}

export default CarouselChapter
