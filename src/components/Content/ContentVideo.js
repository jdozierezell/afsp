import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoCSS = css`
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%;
	margin: ${styles.scale.px24} 0;
	iframe {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
`

const ContentVideo = ({ video: { video } }) => {
	let src
	const provider = video.provider
	switch (provider) {
		case 'youtube':
			src = `https://www.youtube-nocookie.com/embed/${video.providerUid}`
			break
		case 'vimeo':
			src = `https://player.vimeo.com/video/${video.providerUid}`
	}
	console.log(video)
	return (
		<div css={videoCSS}>
			<iframe
				src={src}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	)
}

export default ContentVideo
