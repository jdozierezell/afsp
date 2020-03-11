import React from 'react'
import Img from 'gatsby-image'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const shareableOverlaysCSS = css`
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: center;
	> div {
		background-color: ${styles.colors.lightGray};
		margin: ${styles.scale.px12} auto;
		width: calc(100% - ${styles.scale.px24});
		height: calc(100% - ${styles.scale.px24});
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px16};
			width: calc(100% / 3 - ${styles.scale.px16} * 2);
			height: calc(100% / 3 - ${styles.scale.px16} * 2);
		}
	}
`

const ShareableOverlays = ({ overlays, updateOverlay }) => {
	return (
		<div css={shareableOverlaysCSS}>
			{overlays.map((overlay, index) => {
				return (
					<div key={index} onClick={e => updateOverlay(e.target)}>
						{/* <img src={overlay.image.url} alt="" /> */}
						<Img fluid={overlay.image.fluid} />
					</div>
				)
			})}
		</div>
	)
}

export default ShareableOverlays
