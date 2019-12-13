import React from 'react'
import { css } from '@emotion/core'

import HeaderAside from './HeaderAside'
import Navigation from '../Navigation/Navigation'

const navCSS = css`
	position: relative;
	z-index: 1000;
`

const Header = ({ nav, theme }) => {
	return (
		<header>
			<HeaderAside />
			<div css={navCSS}>
				<Navigation nav={nav} theme={theme} />
			</div>
		</header>
	)
}

export default Header
