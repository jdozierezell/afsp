import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'
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
		span,
		p {
			margin: ${styles.scale.px16} 0 0;
			display: block;
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
	return (
		<div css={channelCSS}>
			{channelLink.__typename === 'DatoCmsInternalLink' && (
				<Link
					to={buildUrl(
						channelLink.link.__typename,
						channelLink.link.slug
					)}
				>
					<GatsbyImage
						image={image.gatsbyImageData}
						alt={image.alt}
						css={channelImageCSS}
						style={{
							display: 'block',
						}}
					/>
					<span
						dangerouslySetInnerHTML={{
							__html: heading,
						}}
					></span>
					<p>{brief}</p>
					<p>Learn more</p>
				</Link>
			)}
			{channelLink.__typename === 'DatoCmsAnchor' && (
				<>
					<a href={`${channelLink.anchor}`}>
						<GatsbyImage
							image={image.gatsbyImageData}
							alt={image.alt}
							css={channelImageCSS}
							style={{
								display: 'block',
							}}
						/>
						<span
							dangerouslySetInnerHTML={{
								__html: heading,
							}}
						></span>
						<p>{brief}</p>
						<p>Learn more</p>
					</a>
				</>
			)}
			{channelLink.__typename === 'DatoCmsExternalUrl' && (
				<>
					<a
						href={channelLink.externalUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<GatsbyImage
							image={image.gatsbyImageData}
							alt={image.alt}
							css={channelImageCSS}
							style={{
								display: 'block',
							}}
						/>
						<span
							dangerouslySetInnerHTML={{
								__html: heading,
							}}
						></span>
						<p>{brief}</p>
						<p>Learn more</p>
					</a>
				</>
			)}
		</div>
	)
}

export default Channel
