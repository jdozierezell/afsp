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
		margin: ${styles.scale.px16};
		width: calc(100% / 3 - ${styles.scale.px16} * 2);
		height: calc(100% / 3 - ${styles.scale.px16} * 2);
		background-color: ${styles.colors.lightGray};
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
