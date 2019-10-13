import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoHeroCSS = css`
	margin-bottom: ${styles.scale.px50};
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 150px repeat(3, auto);
	@media (min-width: ${styles.screens.tablet}px) {
		overflow: hidden;
		max-height: 600px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 200px repeat(3, auto);
	}
`

const videoImageCoverCSS = css`
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
	grid-gap: ${styles.gridGap.mobile};
	margin: 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.video}px) {
		grid-area: 4 / 1 / 5 / 2;
		margin: 0 ${styles.scale.px50} ${styles.scale.px50};
	}
`

const HeroChapter = ({ chapter, type, src }) => {
	return (
		<section css={videoHeroCSS}>
			{type === 'video' && (
				<video
					autoPlay
					muted
					loop
					css={videoImageCoverCSS}
					src={src}
				></video>
			)}
			{type === 'image' && (
				<img css={videoImageCoverCSS} src={src} alt=""></img>
			)}
			<div css={descriptionBackgroundCSS}></div>
			<h2 css={chapterNameCSS}>
				<span>AFSP {chapter}</span>
			</h2>
			<p css={chapterDescriptionCSS}>
				It doesn’t take much to make a big difference, and there are
				opportunities for all levels of commitment.
			</p>
			<div css={buttonWrapperCSS}>
				<a className="secondary-button" href="https://example.com">
					Volunteer
				</a>
				<a className="secondary-button" href="https://example.com">
					Events
				</a>
				<a className="secondary-button" href="https://example.com">
					Programs
				</a>
				<a className="secondary-button" href="https://example.com">
					News
				</a>
			</div>
		</section>
	)
}

export default HeroChapter
