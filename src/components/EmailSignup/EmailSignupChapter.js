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
	form {
		> div {
			display: flex !important;
			flex-direction: row !important;
			flex-wrap: wrap;
			align-items: center !important;
			> div:first-child {
				flex: 1 1 !important;
				margin: 40px 24px 40px 0 !important;
			}
		}
		input {
			margin: 40px 24px 40px 0;
			font-size: 18px !important;
			line-height: 50px !important;
			background-color: white !important;
			color: #262626 !important;
			border-radius: 5px !important;
			border: 2px solid #262626 !important;
			padding: 0 16px !important;
			height: initial !important;
		}
		input::placeholder {
			font-family: ${styles.fonts.avenirRegular} !important;
			line-height: ${styles.scale.px54} !important;
			color: #333;
			font-size: ${styles.scale.px18};
		}
		button {
			font-family: ${styles.fonts.avenirBold} !important;
			font-size: 18px !important;
			color: hsla(355, 84.3%, 50%, 1) !important;
			text-align: center !important;
			line-height: 50px !important;
			background-color: hsla(0, 0%, 100%, 1) !important;
			border-radius: 30px !important;
			border: solid 2px hsla(355, 84.3%, 50%, 1) !important;
			padding: 0px 32px !important;
			display: inline-block !important;
			text-decoration: none !important;
			cursor: pointer !important;
			font-weight: 400 !important;
			background-color: hsla(0, 0%, 100%, 1) !important;
			width: initial !important;
		}
	}
`

// const subscribeCSS = css`
// 	display: flex;
// 	flex-flow: row wrap;
// 	align-items: center;
// 	justify-content: center;
// 	@media (min-width: ${styles.screens.tablet}px) {
// 		justify-content: space-between;
// 	}
// 	input {
// 		flex-grow: 1;
// 		flex-shrink: 1;
// 		flex-basis: 100%;
// 		margin: ${styles.scale.px40} 0;
// 		@media (min-width: ${styles.screens.tablet}px) {
// 			margin: ${styles.scale.px40} ${styles.scale.px24}
// 				${styles.scale.px40} 0;
// 			flex-basis: initial;
// 		}
// 	}
// `

const EmailSignup = ({ email }) => {
	return (
		<div css={emailCSS}>
			<div>
				<h2>Sign up for chapter news</h2>
			</div>
			<div className={`klaviyo-form-${email}`}></div>
			{/* <div css={subscribeCSS}>
				<input placeholder="Email address" type="text" />
				<a className="secondary-button" href="https://example.com">
					Subscribe
				</a>
			</div> */}
		</div>
	)
}

export default EmailSignup
