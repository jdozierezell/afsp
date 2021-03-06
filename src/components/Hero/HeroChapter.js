import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

const videoHeroCSS = css`
	margin-bottom: ${styles.scale.px50};
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 150px repeat(3, auto);
	@media (min-width: ${styles.screens.tablet}px) {
		overflow: hidden;
		max-height: 700px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 200px repeat(3, auto);
	}
`

const videoImageCoverCSS = css`
	line-height: 0;
	height: calc(100vw / 1.78);
	min-height: 300px;
	max-height: 700px;
	width: 100%;
	margin-bottom: 0;
	grid-area: 1 / 1 / 3 / 2;
	background-position: center;
	background-size: cover;
	@media (min-width: ${styles.screens.tablet}px) {
		height: calc(100vw);
		grid-area: 1 / 1 / 5 / 3;
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
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

const chapterNameCSS = css`
	grid-area: 2 / 1 / 3 / 2;
	font-size: ${styles.scale.px46};
	color: ${styles.colors.white};
	margin: 0 ${styles.scale.px24};
	z-index: 1;
	line-height: 1.3;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px60};
	}
	span {
		box-shadow: 0 0 0 10px ${styles.colors.blue};
		background-color: ${styles.colors.blue};
		box-decoration-break: clone;
	}
`

const chapterDescriptionCSS = css`
	margin: 0 ${styles.scale.px24};
	max-width: 500px;
	z-index: 1;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 3 / 1 / 4 / 2;
		margin: 0 ${styles.scale.px50};
	}
	:first-of-type {
		margin-top: ${styles.scale.px40};
	}
	:last-of-type {
		margin-bottom: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px60};
			color: ${styles.colors.white};
		}
	}
`

const buttonWrapperCSS = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: ${styles.scale.px54} ${styles.scale.px54};
	grid-gap: ${styles.gridGap.desktop};
	margin: 0 ${styles.scale.px24};
	z-index: 1;
	@media (min-width: ${styles.screens.video}px) {
		grid-area: 4 / 1 / 5 / 2;
		margin: 0 ${styles.scale.px50} ${styles.scale.px50};
	}
`

const HeroChapter = ({ title, video, poster, brief, slug }) => {
	return (
		<section css={videoHeroCSS}>
			<div
				css={css`
					${videoImageCoverCSS};
					background-image: url(${`${poster}?auto=format&w=1920&h=1080&fit=crop&crop=faces&q=30`});
				`}
			>
				{video && (
					<video autoPlay muted loop playsInline src={video}></video>
				)}
			</div>
			<div css={descriptionBackgroundCSS}></div>
			<h2 css={chapterNameCSS}>
				<span>AFSP {title}</span>
			</h2>
			<p css={chapterDescriptionCSS}>{brief}</p>
			<div css={buttonWrapperCSS}>
				<Link
					className="secondary-button"
					to={`/chapter/${slug}#volunteer`}
				>
					Volunteer
				</Link>
				<Link
					className="secondary-button"
					to={`/chapter/${slug}#events`}
				>
					Events
				</Link>
				<Link
					className="secondary-button"
					to={`/chapter/${slug}#programs`}
				>
					Programs
				</Link>
				<Link className="secondary-button" to={`/chapter/${slug}#news`}>
					News
				</Link>
			</div>
		</section>
	)
}

export default HeroChapter
