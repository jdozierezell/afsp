import React from 'react'
import { css } from '@emotion/core'

import HeaderAside from './HeaderAside'
import Navigation from '../Navigation/Navigation'

import { styles } from '../../css/css'

const navCSS = css`
	position: relative;
	z-index: 1000;
`

const skipCSS = css`
	background: #e77e23;
	height: 30px;
	left: 0;
	padding: 8px;
	position: absolute;
	transform: translateY(-100%);
	transition: transform 0.3s;
	color: ${styles.colors.darkGray};
	&:focus {
		transform: translateY(0%);
	}
`

const Header = ({ nav, theme, overrideLight }) => {
	return (
		<header>
			<a css={skipCSS} href="#main" tabIndex="1">
				Skip to content
			</a>
			<HeaderAside />
			<div css={navCSS}>
				<Navigation
					nav={nav}
					theme={theme}
					overrideLight={overrideLight}
				/>
			</div>
		</header>
	)
}

export default Header
