import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const emailCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	color: ${styles.colors.black};
	text-align: center;
	@media (min-width: ${styles.screens.tablet}px) {
		text-align: left;
		padding: ${styles.scale.px60} ${styles.scale.px50};
	}
	h2 {
		font-size: ${styles.scale.px36};
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: 0;
		}
	}
`

const subscribeCSS = css`
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	@media (min-width: ${styles.screens.tablet}px) {
		justify-content: space-between;
	}
	input {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 100%;
		margin: ${styles.scale.px40} 0;
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px40} 0 ${styles.scale.px20};
			flex-basis: initial;
			width: 100%;
		}
	}
`

const ChapterSignup = () => {
	return (
		<div css={emailCSS}>
			<h2>Sign up for chapter news</h2>
			<div css={subscribeCSS}>
				<input placeholder="Email address" type="text" />
				<a className="secondary-button" href="https://example.com">
					Subscribe
				</a>
			</div>
		</div>
	)
}

export default ChapterSignup
