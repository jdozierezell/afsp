import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

import LogoColor from './LogoColor'
import Menu from './Menu'
import IconHamburger from './IconHamburger'
import IconX from './IconX'
import IconSearch from './IconSearch'
import SearchBar from './SearchBar'
import { useWindowDimensions } from './WindowDimensionsProvider'

import '../css/hamburger.css'
import { styles } from '../css/css'

const navCSS = css`
	margin: 0 0 50px;
	@media (hover: hover) {
		:hover {
			background-color: ${styles.colors.white};
		}
	}
`

const navTopCSS = css`
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	padding: 14px 24px;
`

const logoCSS = css`
	min-width: 110px;
	max-width: 150px;
	grid-column: 1 / 3;
`

const searchCSS = css`
	grid-column: 7 / 8;
	background-color: transparent;
	border: none;
	width: 50px;
	justify-self: end;
`

const hamburgerCSS = css`
	margin: 0;
	padding: 0;
	grid-column: 8 / 9;
	width: ${styles.scale.px24};
	justify-self: end;
	background: transparent;
	border: none;
`
const Navigation = () => {
	const [isMenuActive, setMenuActive] = useState(false)
	const [isSearchActive, setSearchActive] = useState(false)
	const [navColor, setNavColor] = useState('transparent')

	const { width } = useWindowDimensions()

	console.log(width)

	useEffect(() => {
		if (isMenuActive || isSearchActive) {
			setNavColor(styles.colors.white)
		} else {
			setNavColor('transparent')
		}
	})

	return (
		<div css={navCSS}>
			<div
				css={css`
					${navTopCSS};
					background-color: ${navColor};
				`}
			>
				<div css={logoCSS}>
					<LogoColor />
				</div>
				<button
					css={searchCSS}
					onClick={() => setSearchActive(!isSearchActive)}
				>
					<IconSearch />
				</button>
				<button
					css={hamburgerCSS}
					onClick={() => setMenuActive(!isMenuActive)}
				>
					{isMenuActive ? (
						<IconX />
					) : (
						<IconHamburger color={styles.colors.darkGray} />
					)}
				</button>
			</div>
			{isSearchActive && <SearchBar />}
			{isMenuActive && <Menu />}
		</div>
	)
}

export default Navigation
