import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoHeroCSS = css`
	overflow: hidden;
	video {
		height: calc(100vw / 1.78);
		min-height: 250px;
		object-fit: cover;
	}
	h2 {
		font-size: ${styles.scale.px46};
		color: ${styles.colors.white};
		width: 220px;
		margin: 20px;
		span {
			box-shadow: 0 0 0 10px ${styles.colors.blue};
			background-color: ${styles.colors.blue};
			box-decoration-break: clone;
		}
	}
`

const VideoHero = () => {
	return (
		<section css={videoHeroCSS}>
			<video src="https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175"></video>
			<h2>
				<span>You're not alone</span>
			</h2>
		</section>
	)
}

export default VideoHero
