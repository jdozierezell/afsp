import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const audioCSS = css`
	figcaption {
		font-family: ${styles.fonts.avenirRegular};
		padding-top: ${styles.scale.px36};
	}
	video {
		width: 100%;
		height: ${styles.scale.px64};
	}
`

const ContentAudio = ({ audio, captions, language }) => {
	// changed audio element to video so that transcripts can be added
	return (
		<figure css={audioCSS}>
			<figcaption>{audio.title}</figcaption>
			<video controls src={audio.url}>
				<source src={audio.url} />
				Your browser does not support the
				<code>audio</code> element.
			</video>
		</figure>
	)
}
export default ContentAudio
