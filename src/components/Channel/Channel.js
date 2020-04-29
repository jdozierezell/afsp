import React from 'react'
import { css } from '@emotion/core'
import Img from 'react-datocms'
import { Link } from 'gatsby'

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
	a {
		display: inline-block;
		color: ${styles.colors.darkGray};
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px20};
		text-decoration: none;
		width: 100%;
		@media (min-width: ${styles.screens.tablet}px) {
			text-align: left;
		}
		span {
			display: inline-block;
			margin: ${styles.scale.px30} 0 0;
		}
		:hover span,
		:hover p:last-of-type {
			text-decoration: underline;
		}
		p:last-of-type {
			color: ${styles.colors.poppy};
		}
	}
`

const channelImageCSS = css`
	min-width: 125px;
	max-width: 150px;
	margin: 0 auto;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0;
	}
`

const Channel = ({ slug, channel }) => {
	const { image, heading, brief } = channel
	const channelLink = channel.channelLink[0]
	console.log(image)
	return (
		<div css={channelCSS}>
			{channelLink.__typename === 'DatoCmsInternalLink' && (
				<Link
					to={buildUrl(
						channelLink.link.__typename,
						channelLink.link.slug
					)}
				>
					<Img data={image.responsiveImage} />
					<span>{heading}</span>
					<p>{brief}</p>
					<p>Learn more</p>
				</Link>
			)}
			{/* {channelLink.__typename === 'DatoCmsAnchor' && (
				<>
					<Link to={`${slug}/${channelLink.anchor}`}>
						<Img css={channelImageCSS} fluid={image.fluid} alt="" />
						<span>{heading}</span>
						<p>{brief}</p>
					</Link>
				</>
			)} */}
		</div>
	)
}

export default Channel
