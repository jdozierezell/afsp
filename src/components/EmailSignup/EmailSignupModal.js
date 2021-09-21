import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { css, ClassNames } from '@emotion/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import IconX from '../SVGs/IconX'

import { styles } from '../../css/css'

Modal.setAppElement(`#___gatsby`)

const insideModalCSS = css`
	h2 {
		font-size: ${styles.scale.px24} !important;
		text-align: center;
	}
`

const formCSS = css`
	display: grid;
	justify-items: center;
	input {
		width: 100%;
	}
	input[type='submit'] {
		width: auto;
		line-height: inherit;
		margin: 0 auto;
	}
	label {
		width: 100%;
		margin-bottom: ${styles.scale.px7};
		span {
			font-size: ${styles.scale.px18};
			padding-left: ${styles.scale.px5};
			color: ${styles.colors.poppy};
		}
	}
	p {
		width: 100%;
		margin-top: ${styles.scale.px7};
		&.error {
			color: ${styles.colors.poppy};
		}
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

let schema = yup.object().shape({
	firstName: yup.string().required('Your first name is required'),
	lastName: yup.string().required('Your last name is required'),
	email: yup
		.string()
		.email()
		.required('A properly formatted email address is required.'),
	zip: yup.string().matches(/^[0-9]{5}-?([0-9]{4})?$/g, {
		message:
			'AFSP chapters and advocacy efforts are currently only available in the U.S. Please enter a five or nine digit U.S. zip code.',
		excludeEmptyString: true,
	}),
})

const EmailSignupModal = ({ modalIsOpen, closeModal }) => {
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = data => {
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
						background: hsla(0, 0%, 91.8%, 1);
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
						<form
							onSubmit={handleSubmit(onSubmit)}
							css={css`
								${formCSS};
								${submitted ? 'display: none' : ''}
							`}
						>
							<label htmlFor="firstName">
								First Name<span>*</span>
							</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								ref={register}
							/>
							<p className="error">{errors.firstName?.message}</p>

							<label htmlFor="lastName">
								Last Name<span>*</span>
							</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								ref={register}
							/>
							<p className="error">{errors.lastName?.message}</p>

							<label htmlFor="email">
								Email<span>*</span>
							</label>
							<input
								type="email"
								name="email"
								id="email"
								ref={register}
							/>
							<p className="error">{errors.email?.message}</p>

							<p>
								A zip code is optional but connects you to
								activities and advocacy efforts in your local
								community.
							</p>
							<label htmlFor="zipCode">Zip Code</label>
							<input
								type="text"
								name="zip"
								id="zipCode"
								ref={register}
							/>
							<p className="error">{errors.zip?.message}</p>

							<input
								className="secondary-button"
								type="submit"
								value="Subscribe"
							/>
						</form>
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
