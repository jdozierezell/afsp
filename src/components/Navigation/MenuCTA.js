import React from 'react'
import { css } from '@emotion/core'

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
	@media (hover: hover) {
		:hover {
			background-color: ${styles.colors.poppyHover};
		}
	}
`

const MenuCTA = ({ width, margin }) => {
	return (
		<button
			css={css`
				${ctaButtonCSS};
				width: ${width};
				margin: ${margin};
			`}
		>
			Walk with Us
		</button>
	)
}

export default MenuCTA
