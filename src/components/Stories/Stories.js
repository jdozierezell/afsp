import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const featuredCSS = css`
	img {
		margin: 0;
	}
	h2 {
		margin: ${styles.scale.px30} 0;
		a {
			font-size: ${styles.scale.px20};
			line-height: ${styles.scale.px28};
		}
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px30} 0 ${styles.scale.px35};
		}
	}
	p {
		margin-bottom: ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px60};
		}
	}
	h3 {
		margin-bottom: 0;
		font-size: ${styles.scale.px17};
		text-transform: uppercase;
		a {
			font-size: ${styles.scale.px17};
		}
	}
	a {
		font-family: ${styles.fonts.avenirBold};
		color: ${styles.colors.darkGray};
		text-decoration: none;
		:hover {
			color: ${styles.colors.poppy};
			text-decoration: underline;
		}
	}
`

const Stories = ({ story: { node } }) => {
	return (
		<div css={featuredCSS}>
			<img src={node.coverImage.fluid.src} alt="" />
			<h2>
				<a href={`story/${node.slug}`}>{node.title}</a>
			</h2>
			<p>{node.seo.description}</p>
			<h3>
				By{' '}
				{node.author.map(author => (
					<a href={`author/${author.slug}`}>{author.authorName}</a>
				))}
			</h3>
		</div>
	)
}

export default Stories
