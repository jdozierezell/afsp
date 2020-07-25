import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'

const videoCTACSS = css`
	overflow: hidden;
	position: relative;
	min-height: 500px;
	max-height: 580px;
	line-height: 0;
	background-size: cover;
	background-position: center;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-bottom: 0;
		line-height: initial;
	}
	a {
		line-height: initial;
	}
`

const videoCoverCSS = css`
	position: relative;
	line-height: 0;
	height: calc(100vw / 1.78);
	min-height: 500px;
	max-height: 580px;
	width: 100%;
	object-fit: cover;
	@media (min-width: ${styles.screens.tablet}px) {
		height: calc(100vw);
	}
`

const videoDescriptionCSS = css`
	position: absolute;
	top: 50px;
	left: 24px;
	right: 24px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0;
		padding: 0 ${styles.scale.px50};
		position: absolute;
		width: 70vw;
		max-width: 600px;
		bottom: 195px;
		width: 50vw;
		top: 0px;
		left: 0px;
		bottom: 0px;
		background: linear-gradient(
			90deg,
			rgba(38, 38, 38, 0.7) 0%,
			rgba(38, 38, 38, 0) 100%
		);
	}
	p {
		display: none;
		@media (min-width: ${styles.screens.tablet}px) {
			display: block;
		}
		:last-of-type {
			@media (min-width: ${styles.screens.tablet}px) {
				margin-bottom: ${styles.scale.px60};
				color: ${styles.colors.white};
			}
		}
	}
	h2 {
		font-size: ${styles.scale.px36};
		color: ${styles.colors.white};
		margin-bottom: ${styles.scale.px40};
		width: 220px;
	}
`

const descriptionWrapperCSS = css`
	word-wrap: initial;
	@media (min-width: ${styles.screens.tablet}px) {
		position: absolute;
		top: ${styles.scale.px80};
	}
`

const CTAVideo = ({ cta, number, id }) => {
	const {
		backgroundVideo,
		backgroundImage,
		heading,
		brief,
		linkText,
		file,
		fileAsset,
		linkUrl,
		link,
		external,
	} = cta
	let video
	if (backgroundVideo) {
		video = backgroundVideo.video
			? backgroundVideo.video.mp4Url
			: backgroundVideo.url
	}
	return (
		<BackgroundImage
			id={id}
			Tag="section"
			fluid={backgroundImage.fluid}
			css={videoCTACSS}
		>
			{video && (
				<>
					<video
						autoPlay
						muted={true}
						loop
						playsInline
						css={videoCoverCSS}
						src={video}
						aria-describedby={`videoDescription-${number}`}
					></video>
					<p class="sr-only" id={`videoDescription-${number}`}>
						{backgroundVideo.alt}
					</p>
				</>
			)}
			<div css={videoDescriptionCSS}>
				<div css={descriptionWrapperCSS}>
					<h2>{heading}</h2>
					<p
						dangerouslySetInnerHTML={{
							__html: brief,
						}}
					></p>
					{file && (
						<a href={fileAsset.url} className="secondary-button">
							{linkText}
						</a>
					)}
					{!file && external && (
						<a
							href={linkUrl}
							className="secondary-button"
							target="_blank"
							rel="noopener noreferrer"
						>
							{linkText}
						</a>
					)}
					{!file && !external && (
						<Link
							className="secondary-button"
							to={buildUrl(link.__typename, link.slug)}
						>
							{linkText}
						</Link>
					)}
				</div>
			</div>
		</BackgroundImage>
	)
}

export default CTAVideo
