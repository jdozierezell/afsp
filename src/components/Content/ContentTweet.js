import React from 'react'
import { css } from '@emotion/core'
import Clipboard from 'react-clipboard.js'

import { styles } from '../../css/css'

const tweetGroupCSS = css`
	display: flex;
	padding-bottom: ${styles.scale.px16};
	justify-content: space-between;
	align-items: center;
	margin: ${styles.scale.px16} 0;
	border-bottom: 1px solid ${styles.colors.darkGray};
`

const tweetCSS = css`
	font-family: ${styles.fonts.avenirRegular};
	margin-right: ${styles.scale.px24};
	display: inline-block;
`

const buttonGroupCSS = css`
	min-width: 250px;
	margin: 0;
`
const ContentTweet = ({ tweet, navigation }) => {
	const encodedTweet = encodeURIComponent(tweet)
	return (
		<div
			css={css`
				${tweetGroupCSS};
				width: calc(100vw - (${styles.scale.px50} * 2));
				@media (min-width: ${styles.screens.navigation}px) {
					width: ${navigation
						? `calc(100vw - 550px)`
						: `calc(100vw - (${styles.scale.px50} * 2))`};
				}
			`}
		>
			<span css={tweetCSS}>{tweet}</span>
			<div css={buttonGroupCSS} className="secondary-button-group">
				<Clipboard data-clipboard-text={tweet}>Copy</Clipboard>
				<button
					onClick={() =>
						window.open(
							`https://twitter.com/intent/tweet?text=${encodedTweet}`,
							'blank'
						)
					}
				>
					Tweet
				</button>
			</div>
		</div>
	)
}

export default ContentTweet
