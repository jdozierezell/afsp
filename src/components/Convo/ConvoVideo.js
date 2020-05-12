import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoCSS = css`
	width: 100%;
`

const ConvoVideo = ({ video }) => {
	return (
		<div>
			<video css={videoCSS} controls src={video.video.url} />
			<a
				target="_blank"
				rel="noopener noreferrer"
				download
				className="secondary-button"
				href={video.video.url}
			>
				Download &amp; Share
			</a>
		</div>
	)
}

export default ConvoVideo
