import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

const carouselComponentCSS = css`
	margin: 0 ${styles.gridGap.desktop} 0 0;
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px35} ${styles.scale.px24} ${styles.scale.px75};
	border-radius: 5px;
	position: relative;
	min-height: 250px;
	min-width: 150px;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px40} ${styles.scale.px40} ${styles.scale.px80};
		min-height: 325px;
	}
`

const carouselMessageCSS = css`
	font-family: ${styles.fonts.avenirBold};
	font-size: ${styles.scale.px17};
	@media (min-width: ${styles.screens.mobile}px) {
		font-size: ${styles.scale.px18};
	}
`

const carouselTitleCSS = css`
	color: ${styles.colors.darkGray};
`

const carouselLinkCSS = css`
	position: absolute;
	bottom: ${styles.scale.px40};
	font-family: ${styles.fonts.avenirDemi};
	text-decoration: underline;
`

const CarouselDetail = ({
	anchor,
	content,
	title,
	externalAnchor,
	buttonText,
	addCSS,
}) => {
	return (
		<div
			css={css`
				${carouselComponentCSS};
				${addCSS};
			`}
		>
			<p css={carouselMessageCSS}>{content}</p>
			{title && <h2 css={carouselTitleCSS}>{title}</h2>}
			{externalAnchor ? (
				<a
					href={anchor}
					css={carouselLinkCSS}
					target="_blank"
					rel="noopener noreferrer"
				>
					{buttonText ? buttonText : 'Learn more'}
				</a>
			) : (
				<Link to={anchor} css={carouselLinkCSS}>
					{buttonText ? buttonText : 'Learn more'}
				</Link>
			)}
		</div>
	)
}

export default CarouselDetail
