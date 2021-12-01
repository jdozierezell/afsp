import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { css, ClassNames } from '@emotion/react'
import EmailSignupFormik from './EmailSignupFormik.js'

import IconX from '../SVGs/IconX'

import { styles } from '../../css/css'

Modal.setAppElement(`#___gatsby`)

const insideModalCSS = css`
	h2 {
		font-size: ${styles.scale.px24} !important;
		text-align: center;
	}
`

const xCSS = css`
	position: absolute;
	right: ${styles.scale.px25};
	top: ${styles.scale.px25};
	width: ${styles.scale.px25};
	cursor: pointer;
	background: none;
	margin: 0;
	padding: 0;
	outline: none;
	border: none;
`

const messageCSS = css`
	margin-top: ${styles.scale.px24};
`

const EmailSignupModal = ({ modalIsOpen, closeModal }) => {
	const emailSubmit = data => {
		axios
			.post('https://serene-dusk-44738.herokuapp.com/email-signup', data)
			.then(response => {
				setSubmitted(true)
				if (response.status === 200) {
					setSubmittedSuccess(true)
				} else {
					setSubmittedFail(true)
				}
			})
	}
	const [submitted, setSubmitted] = useState(false)
	const [submittedSuccess, setSubmittedSuccess] = useState(false)
	const [submittedFail, setSubmittedFail] = useState(false)

	return (
		<ClassNames>
			{({ css, cx }) => (
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					onAfterOpen={() => {
						document.body.style.top = `-${window.scrollY}px`
						document.body.style.position = 'fixed'
						document.body.style.width = '100vw'
					}}
					onAfterClose={() => {
						const scrollY = document.body.style.top
						document.body.style.position = ''
						document.body.style.top = ''
						window.scrollTo(0, parseInt(scrollY || '0') * -1)
					}}
					overlayClassName={css`
						position: fixed;
						inset: 0px;
						background-color: hsla(0, 0%, 14.9%, 0.7);
						z-index: 9999;
						overflow: scroll;
						@media (min-width: ${styles.screens.tablet}px) {
							display: grid;
							justify-items: center;
							align-items: center;
						}
					`}
					className={css`
						position: relative;
						padding: ${styles.scale.px44} ${styles.scale.px24};
						background: hsla(0, 0%, 0%, 1);
						overflow: scroll;
						@media (min-width: ${styles.screens.tablet}px) {
							width: 50vw;
							min-width: 663px;
							max-width: 768px;
							height: 90vh;
							min-width: 768px;
							padding: ${styles.scale.px24} ${styles.scale.px64};
							border-radius: ${styles.scale.px5};
						}
					`}
				>
					<div css={insideModalCSS}>
						<button
							css={css`
								background: transparent;
								border: none;
								outline: none;
							`}
							onClick={closeModal}
						>
							<IconX iconCSS={xCSS}></IconX>
						</button>
						<h2>
							Sign up to learn more about AFSP’s programs, events,
							and the actions you can take to help prevent
							suicide.
						</h2>
						<EmailSignupFormik
							formSubmit={emailSubmit}
						></EmailSignupFormik>

						<div>
							<p
								css={css`
									${messageCSS};
									${submitted && submittedSuccess
										? ''
										: 'display: none'};
								`}
							>
								Thank you for subscribing. Please check your
								email to confirm your subscription and begin
								receiving our communications.
							</p>
							<p
								css={css`
									${messageCSS};
									${submitted && submittedFail
										? ''
										: 'display: none'};
								`}
							>
								We're sorry, but there appears to have been an
								issue with your submission. Please check your
								email address and try again.
							</p>
						</div>
					</div>
				</Modal>
			)}
		</ClassNames>
	)
}

export default EmailSignupModal
