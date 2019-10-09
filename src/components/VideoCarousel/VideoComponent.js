import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoComponentCSS = css`
	margin: 0 ${styles.gridGap.mobile} 0 0;
	flex-shrink: 0;
	video {
		object-fit: cover;
		width: 100%;
		border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	}
	h2 {
		margin: ${styles.scale.px30} 0 0;
		font-size: ${styles.scale.px20};
	}
`

const VideoComponent = ({ src, title }) => {
	return (
		<div
			css={videoComponentCSS}
			draggable
			onDrag={() => console.log('dragging')}
		>
			<video controls src={src}></video>
			<h2>{title}</h2>
		</div>
	)
}

export default VideoComponent
