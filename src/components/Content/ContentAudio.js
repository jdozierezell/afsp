import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const audioCSS = css`
	figcaption {
		font-family: ${styles.fonts.avenirRegular};
	}
	audio {
		width: 100%;
	}
`

const ContentAudio = ({ audio }) => {
	return (
		<figure css={audioCSS}>
			<figcaption>{audio.title}</figcaption>
			<audio controls src={audio.url}>
				<track default kind="captions" srcLang="en" src="#" />
				Your browser does not support the
				<code>audio</code> element.
			</audio>
		</figure>
	)
}
export default ContentAudio
