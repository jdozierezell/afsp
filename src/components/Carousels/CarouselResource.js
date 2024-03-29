import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const resourceComponentCSS = css`
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
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 ${styles.gridGap.mobile} 0 0;
	}
`

const CarouselResource = ({ title, image, link, linkText }) => {
	return (
		<div css={resourceComponentCSS} draggable>
			{link && (
				<a href={link}>
					<GatsbyImage image={image.gatsbyImageData} alt={title} />
					<h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
					{linkText && <p>{linkText}</p>}
				</a>
			)}
			{!link && <GatsbyImage image={image.gatsbyImageData} alt={title} />}
		</div>
	)
}

export default CarouselResource
