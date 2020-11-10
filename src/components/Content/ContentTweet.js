import React from 'react'
import { css } from '@emotion/core'
import Clipboard from 'react-clipboard.js'

import { styles } from '../../css/css'

const tweetGroupCSS = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: ${styles.scale.px16} 0;
`

const tweetCSS = css`
	font-family: ${styles.fonts.avenirRegular};
	margin-right: ${styles.scale.px24};
	max-width: 325px;
	display: inline-block;
`

const buttonGroupCSS = css`
	min-width: 250px;
	margin: 0;
`
const ContentTweet = ({ tweet }) => {
	const encodedTweet = encodeURIComponent(tweet)
	return (
		<div css={tweetGroupCSS}>
			<span css={tweetCSS}>{tweet}</span>
			<div css={buttonGroupCSS} className="secondary-button-group">
				<Clipboard data-clipboard-text={tweet}>Copy</Clipboard>
				<button
					onClick={() =>
						(window.location.href = `https://twitter.com/intent/tweet?text=${encodedTweet}`)
					}
				>
					Tweet
				</button>
			</div>
		</div>
	)
}

export default ContentTweet
