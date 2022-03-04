import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'
import createAnchor from '../../utils/createAnchor'

const featuredCSS = css`
	background-color: ${styles.colors.white};
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
			<GatsbyImage
				image={node.seo.image.gatsbyImageData}
				style={{
					display: 'block',
				}}
				alt=""
			/>
			<h2>
				<Link to={buildUrl(node.__typename, createAnchor(node.slug))}>
					<span
						dangerouslySetInnerHTML={{ __html: node.title }}
					></span>
				</Link>
			</h2>
			<p>{node.seo.description}</p>
			{node.author && (
				<h3>
					By{' '}
					{node.author.map((author, index) => {
						if (author.authorName !== 'AFSP') {
							return (
								<span key={index}>
									<Link
										to={`/author/${author.slug}`}
										key={index}
									>
										{author.authorName}
									</Link>
									{node.author.length > index + 1 && (
										<span>;&nbsp;</span>
									)}
								</span>
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
