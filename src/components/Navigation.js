import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

import LogoColor from './SVGs/LogoColor'
import MobileMenu from './Navigation/MobileMenu'
import DeskMenuItems from './Navigation/DeskMenuItems'
import DeskMenuMega from './Navigation/DeskMenuMega'
import IconHamburger from './SVGs/IconHamburger'
import IconX from './SVGs/IconX'
import IconSearch from './SVGs/IconSearch'
import SearchBar from './Navigation/SearchBar'
import { useWindowDimensions } from './WindowDimensionsProvider'
import MenuCTA from './Navigation/MenuCTA'

import menuItems from './Navigation/MenuItems'

import { styles } from '../css/css'

const navTopCSS = css`
	display: flex;
	flex-flow: row wrap;
	padding: ${styles.scale.px14} 0;
	justify-content: space-between;
	align-items: center;
	margin: 0 0 50px;
	position: relative;
	@media (hover: hover) {
		:hover {
			background-color: ${styles.colors.white};
		}
	}
	@media (min-width: ${styles.screens.mobile}px) {
		padding: 0;
		margin: 0;
	}
`

const logoCSS = css`
	min-width: 110px;
	max-width: 150px;
	padding-left: ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 ${styles.scale.px70} 0 ${styles.scale.px50};
		padding: 0;
		width: 127px;
	}
`

const navButtons = css`
	display: flex;
	min-width: 100px;
	max-width: 215px;
	justify-content: space-between;
	padding-right: ${styles.scale.px24};
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
	const [isMenuActive, setMenuActive] = useState(false)
	const [isSearchActive, setSearchActive] = useState(false)
	const [navColor, setNavColor] = useState('transparent')
	const [activeMegaMenu, setActiveMegaMenu] = useState('')

	const { width } = useWindowDimensions()

	useEffect(() => {
		if (isMenuActive || isSearchActive) {
			setNavColor(styles.colors.white)
		} else {
			setNavColor('transparent')
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
				background-color: ${navColor};
			`}
		>
			<div css={logoCSS}>
				<LogoColor />
			</div>
			{width > styles.screens.mobile && (
				<DeskMenuItems
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
					<IconSearch color={styles.colors.darkGray} />
				</button>
				{width <= styles.screens.mobile && (
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
				)}
				{width > styles.screens.mobile && <MenuCTA />}
			</div>
			{width <= styles.screens.mobile && isSearchActive && <SearchBar />}
			{width <= styles.screens.mobile && isMenuActive && <MobileMenu />}
			{/* {width > styles.screens.mobile && (
				<DeskMenuMega
					items={menuItems}
					activeItem={activeMegaMenu}
					handleMouseEnter={handleMouseEnter}
					handleMouseLeave={handleMouseLeave}
				/>
			)} */}
		</div>
	)
}

export default Navigation
