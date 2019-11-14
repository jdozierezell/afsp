import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

import NavArrow from '../SVGs/IconNavArrow'
import SolidArrow from '../SVGs/IconSolidArrow.svg'

import { styles } from '../../css/css'

const solidHeroCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50}
			${styles.scale.px160};
	}
	h1,
	span {
		color: ${styles.colors.white};
	}
	h1 {
		margin: 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}) {
			margin: ${styles.scale.px40} 0;
		}
	}
	span {
		font-family: ${styles.fonts.avenirRegular};
		font-size: ${styles.scale.px18};
		display: inline-block;
		margin: ${styles.scale.px20} 0;
		@media (min-width: ${styles.screens.tablet}px) {
			padding: 0 ${styles.gridGap.desktop};
		}
	}
	form {
		position: relative;
	}
	input,
	select {
		border: none;
		width: 100%;
		@media (min-width: ${styles.screens.tablet}px) {
			width: initial;
			display: initial;
		}
	}
	.secondary-button {
		margin: ${styles.scale.px40} 0 0;
		width: 100%;
		@media (min-width: ${styles.screens.tablet}px) {
			width: initial;
			margin: 0 0 0 ${styles.scale.px20};
		}
	}
`

const subHeaderCSS = css`
	margin: ${styles.scale.px35} 0 ${styles.scale.px40};
	color: ${styles.colors.white};
	font-family: ${styles.fonts.avenirRegular};
	font-size: ${styles.scale.px18};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px40} 0 ${styles.scale.px60};
	}
`

const inputCSS = css`
	position: relative;
	@media (min-width: ${styles.screens.tablet}px) {
		display: inline-block;
	}
`

const dropDownCSS = css`
	position: relative;
	display: block;
	background-image: url(${SolidArrow});
	background-repeat: no-repeat;
	background-position: right ${styles.scale.px16} top ${styles.scale.px14};
	background-size: ${styles.scale.px24};
	color: ${styles.colors.darkGray};
	font-size: 18px;
	line-height: 50px;
	background-color: ${styles.colors.white};
	border-radius: 5px;
	padding: 0 ${styles.scale.px16};
	font-family: ${styles.fonts.avenirRegular};
	appearance: none;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: 0 ${styles.scale.px56} 0 ${styles.scale.px16};
	}
`

const actionButtonCSS = css`
	position: absolute;
	right: ${styles.scale.px18};
	top: ${styles.scale.px12};
	background-color: transparent;
	border: none;
	padding: 0;
	width: ${styles.scale.px24};
	height: ${styles.scale.px36};
`

const HeroChapterSearch = ({
	title,
	description,
	handleClick,
	radius,
	updateRadius,
	zip,
	updateZip,
}) => {
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		if (clicked) {
			handleClick()
		}
	}, [clicked])

	return (
		<div css={solidHeroCSS}>
			<h1>{title}</h1>
			<h3 css={subHeaderCSS}>{description}</h3>
			<form action="">
				<div css={inputCSS}>
					<input
						type="text"
						placeholder="Search by zip"
						onChange={e => {
							updateZip(e.target.value)
							setClicked(false)
						}}
					/>
					<button css={actionButtonCSS}>
						<NavArrow />
					</button>
				</div>
				<span>within</span>
				<select
					css={dropDownCSS}
					name="radius"
					onChange={e => {
						updateRadius(e.target.value)
						setClicked(false)
					}}
				>
					<option value="15">15 Miles</option>
					<option value="25">25 Miles</option>
					<option value="50">50 Miles</option>
					<option value="100">100 Miles</option>
				</select>
				<button
					className="secondary-button"
					id="search-button"
					onClick={e => {
						e.preventDefault()
						setClicked(true)
					}}
				>
					Search
				</button>
			</form>
		</div>
	)
}

export default HeroChapterSearch
