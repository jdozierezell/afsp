import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

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
		width: 100px;
		@media (min-width: ${styles.screens.tablet}px) {
			width: 125px;
		}
	}
	h2 {
		margin: ${styles.scale.px30} 0;
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px20};
	}
	a,
	h2 {
		text-decoration: none;
	}
`

const Channel = ({ channel }) => {
	const { image, heading, brief, linkText, link } = channel

	return (
		<div css={channelCSS}>
			{!linkText && (
				<>
					<AniLink
						fade
						duration={styles.duration}
						to={buildUrl(link.__typename, link.slug)}
					>
						<img
							src={`${image.url}?w=200&h=200&fit=crop&crop=faces`}
							alt=""
						/>
						<h2>{heading}</h2>
						<div dangerouslySetInnerHTML={{ __html: brief }}></div>
					</AniLink>
				</>
			)}
			{linkText && (
				<>
					<img
						src={`${image.url}?w=200&h=200&fit=crop&crop=faces`}
						alt=""
					/>
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
