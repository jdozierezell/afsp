import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Img from 'gatsby-image'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'
import createAnchor from '../../utils/createAnchor'

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
	console.log(node)
	return (
		<div css={featuredCSS}>
			<Img fluid={node.coverImage.fluid} alt="" />
			<h2>
				<AniLink
					fade
					duration={styles.duration}
					to={
						node.type
							? buildUrl(node.type, createAnchor(node.slug))
							: buildUrl('DatoCmsStory', createAnchor(node.slug))
					}
				>
					{node.title}
				</AniLink>
			</h2>
			<p>{node.seo.description}</p>
			{node.author && (
				<h3>
					By{' '}
					{node.author.map((author, index) => {
						if (author.authorName !== 'AFSP') {
							return (
								<AniLink
									key={index}
									fade
									duration={styles.duration}
									to={`/author/${author.slug}`}
								>
									{author.authorName}
								</AniLink>
							)
						} else {
							return author.authorName
						}
					})}
				</h3>
			)}
		</div>
	)
}

export default Stories
