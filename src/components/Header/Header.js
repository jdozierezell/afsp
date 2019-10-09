import React from 'react'
import { css } from '@emotion/core'

import HeaderAside from './HeaderAside'
import Navigation from '../Navigation/Navigation'

const navCSS = css`
	position: relative;
`

const Header = () => (
	<header>
		<HeaderAside />
		<div css={navCSS}>
			<Navigation />
		</div>
	</header>
)

export default Header
