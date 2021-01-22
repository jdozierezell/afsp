import React, { useState } from 'react'
import Modal from 'react-modal'
import { css } from '@emotion/core'
import Script from 'react-load-script'

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
`

const emailModal = css`
	position: fixed;
`

Modal.setAppElement(`#___gatsby`)

const EmailSignupBar = ({ formId }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false)
	function openModal() {
		setIsOpen(true)
	}
	console.log(modalIsOpen)
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
			>
				<div>
					<h2>
						Sign up to learn more about AFSP’s programs, events, and
						the actions you can take to help prevent suicide.
					</h2>
					<input
						type="email"
						name="email"
						title="email"
						id="k_id_email"
						placeholder="Email address"
					/>
					<p>
						Providing your zip code is optional but lets us send you
						additional information about activities and advocacy
						efforts in your local community.
					</p>
					<input
						type="number"
						name="zip"
						title="zip"
						id="k_id_zip"
						placeholder="Zip code"
					/>
					<button onClick={openModal}>Subscribe</button>
				</div>
			</Modal>
		</aside>
	)
}

export default EmailSignupBar
