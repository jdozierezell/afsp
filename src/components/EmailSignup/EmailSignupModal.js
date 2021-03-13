import React, { useState } from 'react'
import Modal from 'react-modal'
import { css } from '@emotion/react'
import axios from 'axios'

import IconX from '../SVGs/IconX'

import { styles } from '../../css/css'

Modal.setAppElement(`#___gatsby`)

const insideModalCSS = css`
	display: grid;
	justify-items: center;
	h2 {
		font-size: ${styles.scale.px24};
		text-align: center;
		width: 100%;
		margin-bottom: 0;
		@media (min-width: ${styles.screens.tablet}px) {
			font-size: ${styles.scale.px44};
		}
	}
	p {
		width: 100%;
		max-width: 600px;
		text-align: center;
	}
`

const formCSS = css`
	display: flex;
	flex-flow: column;
	align-items: center;
	input {
		margin: 32px 0;
		width: 100%;
		max-width: 600px;
		display: inline-block;
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
		line-height: 54px !important;
		color: #333;
		font-size: 18px;
	}
	button {
		margin-top: 0;
	}
	button:hover {
		text-decoration: none;
	}
	label {
		max-width: 600px;
		text-align: center;
	}
	@media (min-width: ${styles.screens.tablet}px) {
		#zip_code {
			max-width: 300px;
		}
	}
`
const messageCSS = css`
	margin-top: ${styles.scale.px24};
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

const EmailSignupModal = ({ modalIsOpen, closeModal }) => {
	const [submitted, setSubmitted] = useState(false)
	const [submittedSuccess, setSubmittedSuccess] = useState(false)
	const [submittedFail, setSubmittedFail] = useState(false)

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
			.then(response => {
				setSubmitted(true)
				if (response.status === 200) {
					setSubmittedSuccess(true)
				} else {
					setSubmittedFail(true)
				}
			})
	}
	return (
		<Modal
			isOpen={modalIsOpen}
			className="emailModal"
			overlayClassName="emailModalOverlay"
			onRequestClose={closeModal}
		>
			<div css={insideModalCSS}>
				<button onClick={closeModal} css={xCSS}>
					<IconX></IconX>
				</button>
				<h2 className={submitted ? 'hidden' : ''}>
					Sign up to learn more about AFSP’s programs, events, and the
					actions you can take to help prevent suicide.
				</h2>
				<form
					css={css`
						${formCSS};
						${submitted ? 'display: none' : ''}
					`}
					id="email_signup"
					onSubmit={submitEmailSignup}
					className={submitted ? 'hidden' : ''}
				>
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
						Providing your zip code is optional but lets us send you
						additional information about activities and advocacy
						efforts in your local community.
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
				<p
					css={css`
						${messageCSS};
						${submitted && submittedSuccess ? '' : 'display: none'};
					`}
				>
					Thank you for subscribing. Please check your email to
					confirm your subscription and begin receiving our
					communications.
				</p>
				<p
					css={css`
						${messageCSS};
						${submitted && submittedFail ? '' : 'display: none'};
					`}
				>
					We're sorry, but there appears to have been an issue with
					your submission. Please check your email address and try
					again.
				</p>
			</div>
		</Modal>
	)
}

export default EmailSignupModal
