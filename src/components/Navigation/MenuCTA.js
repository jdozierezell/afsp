import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const ctaButtonCSS = css`
	background-color: ${styles.colors.poppy};
	border: none;
	padding: 0 ${styles.scale.px18};
	color: ${styles.colors.white};
	font-family: ${styles.fonts.avenirBold};
	font-size: ${styles.scale.px18};
	line-height: ${styles.scale.px50};
	border-radius: ${styles.scale.px25};
	display: inline-block;
	text-decoration: none;
	text-align: center;
	position: relative;
	@media (hover: hover) {
		:hover {
			background-color: ${styles.colors.poppyHover};
			color: ${styles.colors.white};
		}
	}
`

const MenuCTA = ({ width, margin }) => {
	return (
		<a
			css={css`
				${ctaButtonCSS};
				width: ${width};
				margin: ${margin};
			`}
			href="https://supporting.afsp.org"
			target="_blank"
			rel="noreferrer"
		>
			Donate
		</a>
	)
}

export default MenuCTA
