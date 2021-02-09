import React, { useState } from 'react'
import Modal from 'react-modal'
import { css } from '@emotion/core'
import Script from 'react-load-script'
import axios from 'axios'

import IconX from '../SVGs/IconX'

import { styles } from '../../css/css'

const emailCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	color: ${styles.colors.black};
	text-align: center;
	position: relative;
	z-index: 100;
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: 1fr ${styles.scale.px180};
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
	button {
		width: 100% !important;
		margin: 40px 0;
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
			max-width: ${styles.scale.px180} !important;
		}
	}
	.hidden {
		display: none !important;
	}
`

const xCSS = css`
	position: absolute;
	right: 25px;
	top: 25px;
	width: 25px;
	cursor: pointer;
	background: none;
	margin: 0;
	padding: 0;
	outline: none;
	border: none;
`

Modal.setAppElement(`#___gatsby`)

const EmailSignupBar = ({ formId }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false)
	const [submitted, setSubmitted] = useState(false)
	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}
	const submitEmailSignup = e => {
		e.preventDefault()
		const form = document.getElementById('email_signup')
		let formData = new FormData(form)
		console.log(formData.get('email'))
		axios
			.post(
				'https://serene-dusk-44738.herokuapp.com/email-signup',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then(response => console.log(response))
		// e.target.submit()
	}
	return (
		<aside css={emailCSS} aria-label="email signup form">
			<div>
				<h2 id="klaviyo-signup">Sign up for email alerts</h2>
				<p>
					Receive updates from the American Foundation for Suicide
					Prevention
				</p>
			</div>
			<button onClick={openModal}>Subscribe</button>

			<Modal
				isOpen={modalIsOpen}
				className="emailModal"
				overlayClassName="emailModalOverlay"
				onRequestClose={closeModal}
			>
				<div>
					<button onClick={closeModal} css={xCSS}>
						<IconX></IconX>
					</button>
					<h2 className={submitted ? 'hidden' : ''}>
						Sign up to learn more about AFSP’s programs, events, and
						the actions you can take to help prevent suicide.
					</h2>
					<form
						id="email_signup"
						onSubmit={submitEmailSignup}
						className={submitted ? 'hidden' : ''}
					>
						<input type="hidden" name="g" value={`${formId}`} />
						<input
							type="hidden"
							name="$fields"
							value="$consent,zip_code"
						/>
						<input
							type="hidden"
							name="$list_fields"
							value="$consent"
						/>
						<input
							type="email"
							name="email"
							title="email"
							id="k_id_email"
							placeholder="Email address"
							className={submitted ? 'hidden' : ''}
						/>
						<label
							htmlFor="zip_code"
							className={submitted ? 'hidden' : ''}
						>
							Providing your zip code is optional but lets us send
							you additional information about activities and
							advocacy efforts in your local community.
						</label>
						<input
							type="text"
							name="zip"
							title="zip"
							id="zip_code"
							placeholder="Zip code"
							className={submitted ? 'hidden' : ''}
						/>
						<div className="klaviyo_messages">
							<div
								className="success_message"
								style={{ display: 'none' }}
							></div>
							<div
								className="error_message"
								style={{ display: 'none' }}
							></div>
						</div>
						<div className="klaviyo_form_actions">
							<button
								type="submit"
								className={
									submitted ? 'hidden' : 'secondary-button'
								}
							>
								Subscribe
							</button>
						</div>
					</form>
				</div>
			</Modal>
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
		</aside>
	)
}

export default EmailSignupBar
