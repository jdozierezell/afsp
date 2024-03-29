import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

const videoHeroCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 150px repeat(3, auto);
	background-position: center;
	background-size: cover;
	@media (min-width: ${styles.screens.tablet}px) {
		overflow: hidden;
		max-height: 840px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 200px repeat(3, auto);
	}
`

const videoCoverCSS = css`
	line-height: 0;
	height: calc(100vw / 1.78);
	min-height: 300px;
	max-height: 600px;
	width: 100%;
	object-fit: cover;
	margin-bottom: 0;
	grid-area: 1 / 1 / 3 / 2;
	@media (min-width: ${styles.screens.tablet}px) {
		height: calc(100vw);
		grid-area: 1 / 1 / 5 / 3;
	}
`

const descriptionBackgroundCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: block;
		grid-area: 1 / 1 / 5 / 3;
		margin: 0;
		z-index: 1;
		background: linear-gradient(
			90deg,
			rgba(38, 38, 38, 0.7) 0%,
			rgba(38, 38, 38, 0) 100%
		);
	}
`

const videoHeaderCSS = css`
	grid-area: 2 / 1 / 3 / 2;
	font-size: ${styles.scale.px46};
	color: ${styles.colors.white};
	margin: 0 ${styles.scale.px60} 0 ${styles.scale.px24};
	z-index: 1;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px60};
	}
	span {
		box-shadow: 0 0 0 10px ${styles.colors.blue};
		background-color: ${styles.colors.blue};
		box-decoration-break: clone;
	}
`

const videoDescriptionCSS = css`
	margin: 0 ${styles.scale.px24};
	z-index: 1;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 3 / 1 / 4 / 2;
		margin: 0 ${styles.scale.px50};
		max-width: 500px;
		p,
		a {
			color: ${styles.colors.white};
		}
	}
	p:first-of-type {
		margin-top: ${styles.scale.px25};
	}
	p:last-of-type {
		margin-bottom: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
			color: ${styles.colors.white};
		}
		@media (min-width: ${styles.screens.video}px) {
			margin-bottom: ${styles.scale.px60};
		}
	}
`

const buttonWrapperCSS = css`
	margin: 0 ${styles.scale.px24} ${styles.scale.px50};
	z-index: 1;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 4 / 1 / 5 / 2;
		margin: 0 ${styles.scale.px50} ${styles.scale.px50};
	}
`

const HeroVideo = ({
	videoUrl,
	videoAlt,
	posterUrl,
	heading,
	brief,
	buttonCta,
	buttonExternal,
	buttonUrl,
}) => {
	return (
		<section
			css={css`
				${videoHeroCSS};
				@media (min-width: ${styles.screens.tablet}px) {
					background-image: url(${`${posterUrl}?auto=format&w=1920&h=1080&fit=crop&crop=faces&q=30`});
				}
			`}
		>
			{videoUrl && (
				<>
					<video
						autoPlay
						muted={true}
						loop
						playsInline
						css={videoCoverCSS}
						src={videoUrl}
						aria-describedby="videoDescription"
					></video>
					<p className="sr-only" id="videoDescription">
						{videoAlt}
					</p>
				</>
			)}
			<div css={descriptionBackgroundCSS}></div>
			<h1 css={videoHeaderCSS}>
				<span>{heading}</span>
			</h1>
			<div css={videoDescriptionCSS}>
				<p dangerouslySetInnerHTML={{ __html: brief }}></p>
			</div>
			<div css={buttonWrapperCSS}>
				{buttonExternal ? (
					<a className="secondary-button" href={buttonUrl}>
						{buttonCta}
					</a>
				) : (
					<Link className="secondary-button" to={buttonUrl}>
						{buttonCta}
					</Link>
				)}
			</div>
		</section>
	)
}

export default HeroVideo
