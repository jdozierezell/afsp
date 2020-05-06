import React from 'react'
import { Image } from 'react-datocms'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const shareableOverlaysCSS = css`
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: center;
	> button {
		border: none;
		padding: 0;
		background-color: ${styles.colors.lightGray};
		margin: ${styles.scale.px12} auto;
		width: calc(100% - ${styles.scale.px24});
		height: calc(100% - ${styles.scale.px24});
		cursor: pointer;
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px16};
			width: calc(100% / 3 - ${styles.scale.px16} * 2);
			height: calc(100% / 3 - ${styles.scale.px16} * 2);
		}
		> div {
			display: block !important;
		}
	}
`

const ShareableOverlays = ({ overlays, updateOverlay }) => {
	return (
		<div css={shareableOverlaysCSS}>
			<h2
				css={css`
					width: 100%;
					margin-top: ${styles.scale.px36};
				`}
			>
				Select your message graphic
			</h2>
			{overlays.map((overlay, index) => {
				return (
					<button key={index} onClick={e => updateOverlay(e.target)}>
						{overlay.image.responsiveImage && (
							<Image data={overlay.image.responsiveImage} />
						)}
						{!overlay.image.responsiveImage && (
							<img src={overlay.image.url} />
						)}
					</button>
				)
			})}
		</div>
	)
}

export default ShareableOverlays
