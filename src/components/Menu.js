import React from 'react'
import { css } from '@emotion/core'

import MenuSection from './MenuSection'

import { styles } from '../css/css'

const menuCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px35};
`

const ctaButtonCSS = css`
	background-color: ${styles.colors.poppy};
	width: 100%;
	border: none;
	margin-top: ${styles.scale.px45};
	padding: 0 ${styles.scale.px18};
	color: ${styles.colors.white};
	font-family: ${styles.fonts.avenirDemi};
	font-size: ${styles.scale.px18};
	line-height: ${styles.scale.px50};
	border-radius: ${styles.scale.px25};
	@media (hover: hover) {
		:hover {
			background-color: ${styles.colors.poppyHover};
		}
	}
`

const MenuItems = () => {
	return (
		<div css={menuCSS}>
			<MenuSection title="Real Stories" />
			<MenuSection title="Real Stories" />
			<button css={ctaButtonCSS}>Donate</button>
		</div>
	)
}

export default MenuItems
