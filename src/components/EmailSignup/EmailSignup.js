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
	}
	h2 {
		font-size: ${styles.scale.px36};
		margin-bottom: ${styles.scale.px30};
	}
	p {
		margin: 0;
		font-size: ${styles.scale.px17};
	}
	input {
		margin: 40px ${styles.scale.px24} 40px 0;
		flex-grow: 1;
		flex-shrink: 1;
	}
`

const EmailSignup = () => {
	return (
		<div css={emailCSS}>
			<div>
				<h2>Sign up for email alerts</h2>
				<p>Join our network and be the first to take action</p>
			</div>
			<div
				css={css`
					display: flex;
					flex-flow: row wrap;
					align-items: center;
					justify-content: space-between;
				`}
			>
				<input placeholder="Email address" type="text" />
				<button className="secondary-button">Subscribe</button>
			</div>
		</div>
	)
}

export default EmailSignup
