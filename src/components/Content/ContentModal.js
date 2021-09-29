import React from 'react'
import Modal from 'react-modal'
import { css, ClassNames } from '@emotion/react'

import IconX from '../SVGs/IconX'

import { styles } from '../../css/css'

Modal.setAppElement(`#___gatsby`)

const insideModalCSS = css`
	h2 {
		font-size: ${styles.scale.px24} !important;
		text-align: center;
	}
`

const modalContentCSS = css`
	background-color: ${styles.colors.blue};
	border-radius: ${styles.scale.px5};
	padding: ${styles.scale.px5};
	margin-bottom: ${styles.scale.px7};
	color: ${styles.colors.white};
	text-decoration: none;
	display: block;
	font-family: ${styles.fonts.avenirRegular};
	:hover {
		color: ${styles.colors.white};
		text-decoration: underline;
		font-family: ${styles.fonts.avenirRegular};
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

const ContentModal = ({ modalIsOpen, closeModal, heading, content }) => {
	return (
		<ClassNames>
			{({ css, cx }) => (
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					onAfterOpen={() => {
						document.body.style.top = `-${window.scrollY}px`
						document.body.style.width = '100vw'
						document.body.style.position = 'fixed'
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
							max-height: 90vh;
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
						<h2>{heading}</h2>
						<div
							dangerouslySetInnerHTML={{ __html: content }}
						></div>
					</div>
				</Modal>
			)}
		</ClassNames>
	)
}

export default ContentModal
