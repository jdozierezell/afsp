import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const emailCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	color: ${styles.colors.black};
	text-align: center;
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding: ${styles.scale.px50};
		text-align: left;
		align-items: center;
		grid-column-gap: ${styles.gridGap.desktop};
	}
	h2 {
		font-size: ${styles.scale.px36};
		margin-bottom: 0;
	}
	p {
		margin: 0;
		font-size: ${styles.scale.px17};
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
			margin: ${styles.scale.px40} ${styles.scale.px24}
				${styles.scale.px40} 0;
			flex-basis: initial;
		}
	}
`

const EmailSignup = () => {
	return (
		<div css={emailCSS}>
			<div>
				<h2>Sign up for chapter news</h2>
			</div>
			<div css={subscribeCSS}>
				<input placeholder="Email address" type="text" />
				<a className="secondary-button" href="https://example.com">
					Subscribe
				</a>
			</div>
		</div>
	)
}

export default EmailSignup
