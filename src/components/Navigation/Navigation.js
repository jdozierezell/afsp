import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import Logo from '../SVGs/Logo'
import MobileMenu from './MobileMenu'
import DeskMenu from './DeskMenu'
import IconHamburger from '../SVGs/IconHamburger'
import IconX from '../SVGs/IconX'
import IconSearch from '../SVGs/IconSearch'
import Search from '../Search/Search'
import MenuCTA from './MenuCTA'

import { styles } from '../../css/css'

const navTopCSS = css`
	display: flex;
	flex-flow: row wrap;
	padding: ${styles.scale.px24} 0 ${styles.scale.px16};
	justify-content: space-between;
	align-items: center;
	min-height: 70px;
	@media (min-width: ${styles.screens.navigation}px) {
		padding: 0;
		margin: 0;
	}
`

const logoCSS = css`
	min-width: 110px;
	max-width: 150px;
	padding-left: ${styles.scale.px24};
	@media (min-width: ${styles.screens.navigation}px) {
		margin: ${styles.scale.px28} ${styles.scale.px50} ${styles.scale.px16};
		padding-left: 0;
		width: 126px;
	}
`

const navButtons = css`
	display: flex;
	min-width: 100px;
	max-width: 250px;
	justify-content: space-between;
	gap: ${styles.scale.px24};
	padding-right: ${styles.scale.px24};
	@media (min-width: ${styles.screens.navigation}px) {
		padding-right: ${styles.scale.px50};
		height: 105px;
	}
`

const searchCSS = css`
	margin: 0 ${styles.scale.px17} 0 ${styles.scale.px5};
	padding: ${styles.scale.px16} 0 0;
	width: ${styles.scale.px24};
	background: transparent;
	border: none;
`

const hamburgerCSS = css`
	margin: 0;
	padding: ${styles.scale.px16} 0 0;
	width: ${styles.scale.px24};
	background: transparent;
	border: none;
	@media (min-width: ${styles.screens.navigation}px) {
		display: none;
	}
`

const donateCSS = css`
	@media (min-width: ${styles.screens.navigation}px) {
		margin-top: ${styles.scale.px24};
	}
`

const Navigation = ({ nav, theme, overrideLight, overrideAbsolute }) => {
	const [isMobileLight, setMobileLight] = useState(theme.mobile === 'light')
	const [isDesktopLight, setDesktopLight] = useState(
		theme.desktop === 'light'
	)
	const [isMenuActive, setMenuActive] = useState(false)
	const [isSearchActive, setSearchActive] = useState(false)
	const [isHover, setHover] = useState(false)
	const [navBackground, setNavBackground] = useState('transparent')
	const [navColor, setNavColor] = useState(
		isMobileLight || isDesktopLight
			? styles.colors.white
			: styles.colors.darkGray
	)

	useEffect(() => {
		setMobileLight(theme.mobile === 'light')
		setDesktopLight(theme.desktop === 'light')
		if (isMenuActive || isSearchActive || isHover) {
			setNavBackground(styles.colors.white)
			setNavColor(styles.colors.darkGray)
		} else {
			setNavBackground('transparent')
			if (isMobileLight || isDesktopLight) {
				setNavColor(styles.colors.white)
			}
		}
	}, [
		theme.mobile,
		theme.desktop,
		isMenuActive,
		isSearchActive,
		isHover,
		isMobileLight,
		isDesktopLight,
	])
	return (
		<div
			css={css`
				${navTopCSS};
				background-color: ${navBackground};
				> nav > ul > li > a {
					color: ${navColor};
				}
				position: ${overrideAbsolute ? 'relative' : 'absolute'};
				left: 0;
				right: 0;
			`}
			role="navigation"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<div css={logoCSS}>
				<Link to={`/`} aria-label="AFSP Homepage">
					<Logo
						theme={theme}
						overrideLight={overrideLight}
						isHover={isHover}
						isMenuActive={isMenuActive}
					/>
				</Link>
			</div>
			<DeskMenu items={nav} overrideLight={overrideLight} />
			<div css={navButtons}>
				<div css={donateCSS}>
					<MenuCTA />
				</div>
				<button
					css={searchCSS}
					onClick={() => setSearchActive(!isSearchActive)}
					aria-label="Search"
				>
					{/* set icon color to white on hover or on light theme */}
					<IconSearch
						theme={theme}
						overrideLight={overrideLight}
						isHover={isHover}
						isMenuActive={isMenuActive}
					/>
				</button>
				<button
					css={hamburgerCSS}
					onClick={() => setMenuActive(!isMenuActive)}
					aria-label="Menu"
				>
					{isMenuActive ? (
						<IconX />
					) : (
						// set icon color to white on hover or on light theme
						<IconHamburger
							theme={theme}
							overrideLight={overrideLight}
							isHover={isHover}
							isMenuActive={isMenuActive}
						/>
					)}
				</button>
			</div>
			{isSearchActive && <Search />}
			{isMenuActive && <MobileMenu items={nav} />}
		</div>
	)
}

export default Navigation
