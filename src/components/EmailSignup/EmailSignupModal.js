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

const insideModalCSS = css``

const formCSS = css`
	label {
		span {
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

let schema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
	zip: yup.string().matches(/^[0-9]{5}(-[0-9]{4})?$/g),
})

const EmailSignupModal = ({ modalIsOpen, closeModal }) => {
	const { register, handleSubmit, watch, errors } = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = data => console.log(data)
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
		<ClassNames>
			{({ css, cx }) => (
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					overlayClassName={css`
						/* display: flex; */
						/* align-items: center; */
						/* justify-content: center; */
						position: fixed;
						inset: 0px;
						background-color: hsla(0, 0%, 14.9%, 0.7);
						z-index: 9999;
						overflow: scroll;
					`}
					className={css`
						/* display: flex; */
						/* justify-content: center; */
						/* align-items: center; */
						/* width: 100vw; */
						/* height: 100vh; */
						padding: ${styles.scale.px64} ${styles.scale.px24};
						background: hsla(0, 0%, 91.8%, 1);
						/* overflow: scroll; */
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
						<form onSubmit={handleSubmit(onSubmit)} css={formCSS}>
							<label htmlFor="firstName">
								First Name<span>*</span>
							</label>

							<input
								type="text"
								name="firstName"
								id="firstName"
								ref={register}
							/>
							<p>{errors.firstName?.message}</p>
							<label htmlFor="lastName">
								Last Name<span>*</span>
							</label>

							<input
								type="text"
								name="lastName"
								id="lastName"
								ref={register}
							/>
							<p>{errors.lastName?.message}</p>
							<label htmlFor="email">
								Email<span>*</span>
							</label>

							<input
								type="email"
								name="email"
								id="email"
								ref={register}
							/>
							<p>{errors.email?.message}</p>
							<label htmlFor="zipCode">
								Providing your zip code is optional but lets us
								send you additional information about activities
								and advocacy efforts in your local community.
							</label>
							<input
								type="text"
								name="zip"
								id="zipCode"
								ref={register}
							/>
							<p>{errors.zip?.message}</p>
							<input type="submit" />
						</form>
					</div>
				</Modal>
			)}
		</ClassNames>
	)
}

export default EmailSignupModal
