import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Img from 'gatsby-image'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'

const channelCSS = css`
	text-align: center;
	@media (min-width: ${styles.screens.tablet}px) {
		text-align: left;
	}
	img {
		border-radius: 50%;
		margin: 0;
		display: inline-block;
	}
	h2 {
		margin: ${styles.scale.px30} 0 0;
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px20};
	}
	a,
	h2 {
		text-decoration: none;
		@media (min-width: ${styles.screens.tablet}px) {
			text-align: left;
		}
	}
	a > h2:hover {
		text-decoration: underline;
	}
`

const channelImageCSS = css`
	width: 125px;
	margin: 0 auto;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0;
	}
`

const Channel = ({ channel }) => {
	const { image, heading, brief, linkText, link } = channel
	console.log(image)
	return (
		<div css={channelCSS}>
			{!linkText && (
				<>
					<AniLink
						fade
						duration={styles.duration}
						to={buildUrl(link.__typename, link.slug)}
					>
						<Img css={channelImageCSS} fluid={image.fluid} alt="" />
						<h2>{heading}</h2>
						<div dangerouslySetInnerHTML={{ __html: brief }}></div>
					</AniLink>
				</>
			)}
			{linkText && (
				<>
					<Img css={channelImageCSS} fluid={image.fluid} alt="" />
					<h2>{heading}</h2>
					<p dangerouslySetInnerHTML={{ __html: brief }}></p>
					<AniLink
						fade
						duration={styles.duration}
						to={buildUrl(link.__typename, link.slug)}
					>
						{linkText}
					</AniLink>
				</>
			)}
		</div>
	)
}

export default Channel
