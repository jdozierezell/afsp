import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoCSS = css`
	position: relative;
	background-position: center;
	background-size: cover;
	margin: ${styles.scale.px24} 0;
	video {
		width: 100%;
	}
`

const ContentVideo = ({ video, poster }) => {
	return (
		<div css={videoCSS}>
			<video
				autoPlay
				muted
				loop
				css={css`
					object-fit: cover;
				`}
				src={video}
				poster={poster}
			></video>
		</div>
	)
}

export default ContentVideo
