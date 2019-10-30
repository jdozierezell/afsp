import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const chapterContactCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	color: ${styles.colors.white};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px50};
		background-color: ${styles.colors.lightGray};
		color: ${styles.colors.darkGray};
	}
	h3 {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirBold};
		margin-bottom: ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			color: ${styles.colors.darkGray};
		}
	}
	address {
		font-family: ${styles.fonts.avenirRegular};
		font-style: normal;
		line-height: ${styles.scale.px30};
		margin: 0;
		a {
			color: ${styles.colors.white};
			@media (min-width: ${styles.screens.tablet}px) {
				color: ${styles.colors.darkGray};
			}
			:hover {
				color: ${styles.colors.poppy};
			}
		}
	}
`

const ChapterSignup = ({ contact, addCSS }) => {
	const { name, title, email, phone } = contact
	return (
		<div
			css={css`
				${chapterContactCSS};
				${addCSS};
			`}
		>
			<h3>Chapter contact:</h3>
			<address>
				<strong>{name}</strong>
				<br />
				{title}
				<br />
				<a href={`mailto:${email}`}>{email}</a>
				<br />
				<a href="tel:(646) 284-5790">(646) 284-5790</a>
			</address>
		</div>
	)
}

export default ChapterSignup
