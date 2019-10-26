import React from 'react'
import { css } from '@emotion/core'
import { graphql, useStaticQuery, Link } from 'gatsby'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

const carouselComponentCSS = css`
	margin: 0 ${styles.gridGap.desktop} 0 0;
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px35} ${styles.scale.px24} ${styles.scale.px75};
	border-radius: 5px;
	position: relative;
	min-height: 250px;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px40} ${styles.scale.px40} ${styles.scale.px80};
		min-height: 325px;
	}
`

const carouselMessageCSS = css`
	@media (min-width: ${styles.screens.mobile}px) {
		font-size: ${styles.scale.px18};
	}
`

const carouselLinkCSS = css`
	position: absolute;
	bottom: ${styles.scale.px40};
	font-family: ${styles.fonts.avenirDemi};
	text-decoration: underline;
`

const CarouselStory = ({ baseUrl, content }) => {
	const anchor = createAnchor(content)
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`)
	return (
		<div css={carouselComponentCSS}>
			<h3 css={carouselMessageCSS}>{content}</h3>
			<Link to={`/detail/${baseUrl}/#${anchor}`} css={carouselLinkCSS}>
				Learn more
			</Link>
		</div>
	)
}

export default CarouselStory
