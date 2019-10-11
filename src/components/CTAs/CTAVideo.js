import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoCTACSS = css`
	overflow: hidden;
	position: relative;
	min-height: 500px;
	max-height: 580px;
	line-height: 0;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-bottom: 0;
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
	@media (min-width: ${styles.screens.tablet}px) {
		position: absolute;
		top: ${styles.scale.px80};
	}
`

const CTAVideo = () => {
	return (
		<section css={videoCTACSS}>
			<video
				autoPlay
				muted
				loop
				css={videoCoverCSS}
				src="https://player.vimeo.com/external/364075680.hd.mp4?s=9f70c5f518934c9aea34dc6b49045d7977fd7ac1&profile_id=175"
			></video>
			<div css={videoDescriptionCSS}>
				<div css={descriptionWrapperCSS}>
					<h2>Walk to fight suicide</h2>
					<p>
						Banjo franzen palo santo pour-over artisan organic.
						Fashion axe brunch messenger bag chartreuse jianbing
						poutine. Organic hammock hashtag bespoke meggings.
						Keffiyeh banh mi raclette hella thundercats next level.
					</p>
					<a className="secondary-button" href="https://example.com">
						View all stories
					</a>
				</div>
			</div>
		</section>
	)
}

export default CTAVideo
