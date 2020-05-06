import React from 'react'
import { css } from '@emotion/core'
import { Image } from 'react-datocms'

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

const CarouselResource = ({ title, image, imageFallback, link, linkText }) => {
	return (
		<div css={resourceComponentCSS} draggable>
			<a href={link}>
				{image && <Image data={image} />}
				{!image && (
					<img
						src={`${imageFallback}?auto=format&fit=fill&fill=blur&w=600&h=370`}
					/>
				)}
				<h2>{title}</h2>
				<p>{linkText}</p>
			</a>
		</div>
	)
}

export default CarouselResource
