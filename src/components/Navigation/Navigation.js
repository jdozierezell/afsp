import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'

import LogoColor from '../SVGs/LogoColor'
import LogoWhite from '../SVGs/LogoWhite'
import MobileMenu from './MobileMenu'
import DeskMenu from './DeskMenu'
import IconHamburger from '../SVGs/IconHamburger'
import IconX from '../SVGs/IconX'
import IconSearch from '../SVGs/IconSearch'
import SearchBar from './SearchBar'
import { useWindowDimensions } from '../WindowDimensionsProvider'
import { useHeaderContext } from '../HeaderContextProvider'
import MenuCTA from './MenuCTA'

import menuItems from './MenuItems'

import { styles } from '../../css/css'

const navTopCSS = css`
	display: flex;
	flex-flow: row wrap;
	padding: ${styles.scale.px24} 0;
	justify-content: space-between;
	align-items: center;
	min-height: 100px;
	position: absolute;
	left: 0;
	right: 0;
	@media (min-width: ${styles.screens.navigation}px) {
		padding: 0;
		margin: 0;
	}
`

const logoCSS = css`
	min-width: 110px;
	max-width: 150px;
	padding-left: ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 ${styles.scale.px50} 0 ${styles.scale.px50};
		padding-left: 0;
		width: 126px;
	}
`

const navButtons = css`
	display: flex;
	min-width: 100px;
	max-width: 250px;
	justify-content: space-between;
	padding-right: ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		padding-right: ${styles.scale.px50};
	}
`

const searchCSS = css`
	margin: 0 ${styles.scale.px22} 0 0;
	padding: ${styles.scale.px7} 0 0;
	width: ${styles.scale.px24};
	background: transparent;
	border: none;
`

const hamburgerCSS = css`
	margin: 0;
	padding: ${styles.scale.px7} 0 0;
	width: ${styles.scale.px24};
	background: transparent;
	border: none;
`
const Navigation = () => {
	const { width } = useWindowDimensions()
	const headerContext = useHeaderContext()

	const [isMobileLight, setMobileLight] = useState(
		width <= styles.screens.tablet && headerContext.mobile === 'light'
	)
	const [isDesktopLight, setDesktopLight] = useState(
		width > styles.screens.tablet && headerContext.desktop === 'light'
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
	const [activeMegaMenu, setActiveMegaMenu] = useState('')

	useEffect(() => {
		setMobileLight(
			width <= styles.screens.tablet && headerContext.mobile === 'light'
		)
		setDesktopLight(
			width > styles.screens.tablet && headerContext.desktop === 'light'
		)
		if (isMenuActive || isSearchActive || isHover) {
			setNavBackground(styles.colors.white)
			setNavColor(styles.colors.darkGray)
		} else {
			setNavBackground('transparent')
			if (isMobileLight || isDesktopLight) {
				setNavColor(styles.colors.white)
			}
		}
	})

	const handleMouseEnter = id => {
		setActiveMegaMenu(id)
	}

	const handleMouseLeave = id => {
		setActiveMegaMenu('')
	}
	return (
		<div
			css={css`
				${navTopCSS};
				background-color: ${navBackground};
				color: ${navColor};
			`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<div css={logoCSS}>
				{/* if headerContext is light, logo defaults to white otherwise color; logo is color on hover in all contexts */}
				{(isMobileLight || isDesktopLight) &&
				!isHover &&
				!isMenuActive ? (
					<LogoWhite />
				) : (
					<LogoColor />
				)}
			</div>
			{width > styles.screens.navigation && (
				<DeskMenu
					items={menuItems}
					activeItem={activeMegaMenu}
					handleMouseEnter={handleMouseEnter}
					handleMouseLeave={handleMouseLeave}
				/>
			)}
			<div css={navButtons}>
				<button
					css={searchCSS}
					onClick={() => setSearchActive(!isSearchActive)}
				>
					{/* set icon color to white on hover or on light theme */}
					<IconSearch
						color={
							(isMobileLight || isDesktopLight) && !isHover
								? styles.colors.white
								: styles.colors.darkGray
						}
					/>
				</button>
				{width <= styles.screens.navigation && (
					<button
						css={hamburgerCSS}
						onClick={() => setMenuActive(!isMenuActive)}
					>
						{isMenuActive ? (
							<IconX />
						) : (
							// set icon color to white on hover or on light theme
							<IconHamburger
								color={
									(isMobileLight || isDesktopLight) &&
									!isHover
										? styles.colors.white
										: styles.colors.darkGray
								}
							/>
						)}
					</button>
				)}
				{width > styles.screens.navigation && <MenuCTA />}
			</div>
			{isSearchActive && <SearchBar />}
			{width <= styles.screens.navigation && isMenuActive && (
				<MobileMenu />
			)}
		</div>
	)
}

export default Navigation
