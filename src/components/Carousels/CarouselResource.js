import React from 'react'
import { css } from '@emotion/core'
import Img from 'gatsby-image'

import { styles } from '../../css/css'

const resourceComponentCSS = css`
	margin: 0 ${styles.gridGap.mobile} 0 0;
	flex-shrink: 0;
	div {
		border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	}
	h2 {
		margin: ${styles.scale.px30} 0 0;
		font-size: ${styles.scale.px20};
		white-space: initial;
	}
	a {
		text-decoration: none;
		p {
			color: ${styles.colors.poppy};
			margin: ${styles.scale.px12} 0;
		}
	}
`

const CarouselResource = ({ title, image, link, linkText }) => {
	return (
		<div css={resourceComponentCSS} draggable>
			<a href={link}>
				<Img fluid={image} />
				<h2>{title}</h2>
				<p>{linkText}</p>
			</a>
		</div>
	)
}

export default CarouselResource
