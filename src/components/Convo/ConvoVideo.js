import React from 'react'
import { css } from '@emotion/core'

const videoCSS = css`
	width: calc(100vw / 4);
`

const ConvoVideo = ({ video }) => {
	return <video css={videoCSS} src={video.video.url} />
}

export default ConvoVideo
