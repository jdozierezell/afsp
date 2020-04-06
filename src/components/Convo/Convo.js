import React from 'react'
import { css } from '@emotion/core'
import BackgroundImage from 'gatsby-background-image'

import { styles } from '../../css/css'

const convoCSS = css`
	width: 100vw;
	min-height: 100vh;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: max-content 1fr;
	grid-gap: ${styles.gridGap.mobile};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: minmax(335px, 1fr) minmax(335px, 629px);
		padding: ${styles.scale.px80} ${styles.scale.px50};
		grid-gap: ${styles.gridGap.desktop};
	}
	h2 {
		grid-column: 1 / 2;
		margin-bottom: 0;
		color: inherit;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 1 / 3;
		}
	}
	p {
		color: inherit;
	}
`
const videoCTACSS = css`
	overflow: hidden;
	position: relative;
	min-height: 500px;
	max-height: 580px;
	line-height: 0;
	background-size: contain;
	background-position: center;
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

const Convo = ({ convo, addCSS }) => {
	return (
		<div
			css={css`
				${convoCSS};
				${addCSS};
			`}
		>
			<h2>{convo.title}</h2>
			<BackgroundImage
				Tag="section"
				fluid={convo.posterImage.fluid}
				css={videoCTACSS}
			>
				{convo.video && (
					<video
						autoPlay
						muted
						loop
						playsInline
						css={videoCoverCSS}
						src={convo.video.url}
					></video>
				)}
			</BackgroundImage>
			<div>
				<div dangerouslySetInnerHTML={{ __html: convo.bodyCopy }} />
				<a className="secondary-button" href={convo.fullConvoFile.url}>
					Download the full guide
				</a>
			</div>
		</div>
	)
}

export default Convo
