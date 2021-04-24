import React, { useState } from 'react'
import { css } from '@emotion/react'

import EmailSignupModal from './EmailSignupModal'

import { styles } from '../../css/css'

const emailCSS = css`
	background-color: ${styles.colors.white};
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

const EmailSignupBar = ({ addCSS }) => {
	const [modalIsOpen, setIsOpen] = useState(false)
	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}
	return (
		<aside
			css={css`
				${emailCSS};
				${addCSS};
			`}
			aria-label="email signup form"
		>
			<div>
				<h2 id="klaviyo-signup">Sign up for email alerts</h2>
				<p>
					Receive updates from the American Foundation for Suicide
					Prevention
				</p>
			</div>
			<button onClick={openModal}>Subscribe</button>
			<EmailSignupModal
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
			></EmailSignupModal>
		</aside>
	)
}

export default EmailSignupBar
