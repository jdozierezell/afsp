import React from 'react'
import { css } from '@emotion/react'

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
				controls
				css={css`
					object-fit: cover;
				`}
				src={video}
				poster={`${poster}?w=1920&h=1080&fit=crop&crop=faces`}
			></video>
		</div>
	)
}

export default ContentVideo
