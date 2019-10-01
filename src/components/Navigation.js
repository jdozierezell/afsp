import React, { useState } from 'react'
import { css } from '@emotion/core'

import LogoColor from './LogoColor'
import SearchIcon from './SearchIcon'
import MenuItems from './Menu'

import '../css/hamburger.css'

const navCSS = css`
	margin: 0 0 50px;
`

const navTopCSS = css`
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	padding: 0 24px 14px;
`

const logoCSS = css`
	width: 20px;
	min-width: 110px;
	grid-column: 1 / 3;
`

const searchCSS = css`
	grid-column: 7 / 8;
	background-color: transparent;
	border: none;
	width: 50px;
`

const hamburgerCSS = css`
	margin: 0;
	padding: 0;
	grid-column: 8 / 9;
`
const Navigation = () => {
	const [isActive, setActive] = useState(false)
	const activeClass = isActive ? 'is-active' : ''
	return (
		<div css={navCSS}>
			<div css={navTopCSS}>
				<div css={logoCSS}>
					<LogoColor />
				</div>
				<button css={searchCSS}>
					<SearchIcon />
				</button>
				<button
					className={`hamburger hamburger--spring ${activeClass}`}
					css={hamburgerCSS}
					onClick={() => setActive(!isActive)}
				>
					<span className="hamburger-box">
						<span className="hamburger-inner"></span>
					</span>
				</button>
			</div>
			<MenuItems />
		</div>
	)
}

export default Navigation
