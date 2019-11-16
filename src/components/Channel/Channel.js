import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { styles } from '../../css/css'

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
`

const Channel = ({ channel }) => {
	const { image, heading, brief, linkText } = channel
	let link = ''
	switch (channel.link.__typename) {
		case 'DatoCmsDetail':
			link = `detail/${channel.link.slug}`
			break
		case 'DatoCmsLanding':
			link = `landing/${channel.link.slug}`
			break
		default:
			break
	}
	return (
		<div css={channelCSS}>
			<img src={image.fluid.src} alt="" />
			<h2>{heading}</h2>
			<div dangerouslySetInnerHTML={{ __html: brief }}></div>
			<AniLink fade duration={styles.duration} to={`/${link}`}>
				{linkText}
			</AniLink>
		</div>
	)
}

export default Channel
