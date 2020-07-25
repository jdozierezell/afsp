import React, { useState } from 'react'
import { css } from '@emotion/core'
import Script from 'react-load-script'

import { styles } from '../../css/css'

// if Klaviyo issue persists, legacy form available at https://help.klaviyo.com/hc/en-us/articles/115005249588-Add-and-Customize-a-Legacy-Embedded-Signup-Form

const emailCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	color: ${styles.colors.black};
	text-align: center;
	position: relative;
	z-index: 100;
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
		margin-bottom: ${styles.scale.px30};
	}
	p {
		margin: 0;
		font-size: ${styles.scale.px17};
	}
`

const formCSS = css`
	display: flex;
	flex-flow: row wrap;
	width: 100%;
	.klaviyo_field_group,
	input {
		flex-grow: 1;
	}
	> div {
		display: flex !important;
		align-items: center !important;
		width: 100%;
		> div:first-of-type {
			width: 100% !important;
			@media (min-width: ${styles.screens.tablet}px) {
				flex: 1 1 !important;
				margin: 40px 24px 40px 0 !important;
				width: initial !important;
			}
		}
	}
	input {
		margin: 40px 0;
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
		width: 100% !important;
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
		@media (min-width: ${styles.screens.tablet}px) {
			margin-left: ${styles.scale.px36};
			width: initial !important;
		}
	}
	.success_message {
		font-family: ${styles.fonts.avenirRegular};
		flex-grow: 1;
	}
	.hidden {
		display: none !important;
	}
	.klaviyo_submit_button {
		margin: 0;
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

const EmailSignup = ({ formId, children }) => {
	const [submitted, setSubmitted] = useState(false)

	return (
		<aside css={emailCSS}>
			{children}
			<form
				css={formCSS}
				id="email_signup"
				action="//manage.kmail-lists.com/subscriptions/subscribe"
				data-ajax-submit="//manage.kmail-lists.com/ajax/subscriptions/subscribe"
				method="GET"
				target="_blank"
				noValidate="novalidate"
			>
				<input type="hidden" name="g" value={`${formId}`} />
				<input type="hidden" name="$fields" value="$consent" />
				<input type="hidden" name="$list_fields" value="$consent" />
				<div className={submitted ? 'hidden' : 'klaviyo_field_group'}>
					<label
						id="emailDescription"
						htmlFor="k_id_email"
						className="sr-only"
					>
						Enter your email here to receive updates from the
						American Foundation for Suicide Prevention
					</label>
					<input
						type="email"
						name="email"
						title="email"
						id="k_id_email"
						placeholder="Type your email here..."
						aria-labelledby="klaviyo-signup"
						aria-describedby="emailDescription"
					/>
				</div>
				<div className="klaviyo_messages">
					<div
						className="success_message"
						style={{ display: 'none' }}
					></div>
				</div>
				<div className="klaviyo_form_actions">
					<button
						type="submit"
						className={
							submitted ? 'hidden' : 'klaviyo_submit_button'
						}
					>
						Subscribe
					</button>
				</div>
			</form>
			<Script
				url="//www.klaviyo.com/media/js/public/klaviyo_subscribe.js"
				attributes={{ id: 'klaviyo' }}
				onLoad={() => {
					// eslint-disable-next-line no-undef
					KlaviyoSubscribe.attachToForms('#email_signup', {
						hide_form_on_success: true,
						success_message:
							'Thank you for subscribing. Please check your email to confirm your subscription.',
						extra_properties: {
							$source: '$embed',
							$method_type: 'Klaviyo Form',
							$method_id: 'embed',
						},
						success: () => setSubmitted(true),
					})
				}}
			/>
			{/* <div css={subscribeCSS}>
				<input placeholder="Email address" type="text" />
				<a className="secondary-button" href="https://example.com">
					Subscribe
				</a>
			</div> */}
		</aside>
	)
}

export default EmailSignup
