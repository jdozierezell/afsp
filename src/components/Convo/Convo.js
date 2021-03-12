import React from 'react'
import { css } from '@emotion/core'
import BackgroundImage from 'gatsby-background-image'

import { styles } from '../../css/css'

const convoCSS = css`
	width: 100vw;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: max-content 1fr;
	grid-gap: ${styles.gridGap.mobile};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: minmax(335px, 623px) minmax(335px, 1fr);
		padding: ${styles.scale.px80} ${styles.scale.px50};
		grid-gap: ${styles.scale.px36};
	}
	h2 {
		grid-column: 1 / 2;
		margin-bottom: 0;
		color: inherit;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 1 / 3;
			grid-row: 1 / 2;
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
	line-height: 0;
	background-size: contain;
	background-position: center top;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-bottom: 0;
		line-height: initial;
		grid-column: 1 / 2;
	}
`

const videoCoverCSS = css`
	position: relative;
	line-height: 0;
	width: 100%;
	object-fit: cover;
`

const convoDescriptionCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		grid-column: 2 / 3;
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
				image={convo.posterImage.gatsbyImageData}
				css={videoCTACSS}
			>
				<video
					autoPlay
					muted
					loop
					playsInline
					css={videoCoverCSS}
					src={convo.vimeoExternalUrl}
				></video>
			</BackgroundImage>
			<div css={convoDescriptionCSS}>
				<div dangerouslySetInnerHTML={{ __html: convo.bodyCopy }} />
				<a className="secondary-button" href={convo.fullConvoFile.url}>
					Download the full guide
				</a>
			</div>
		</div>
	)
}

export default Convo
