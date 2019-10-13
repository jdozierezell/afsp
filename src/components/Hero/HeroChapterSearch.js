import React from 'react'
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
	p,
	label,
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
	label,
	span {
		font-family: ${styles.fonts.avenirRegular};
		display: inline-block;
	}
	label {
		margin: ${styles.scale.px35} 0 ${styles.scale.px40};
	}
	span {
		margin: ${styles.scale.px20} 0;
	}
	form {
		position: relative;
	}
	input,
	select {
		border: none;
		width: 100%;
	}
	.secondary-button {
		margin-top: ${styles.scale.px40};
		width: 100%;
	}
`

const inputCSS = css`
	position: relative;
`

const dropDownCSS = css`
	position: relative;
	display: block;
	background-image: url(${SolidArrow});
	background-repeat: no-repeat;
	background-position: right ${styles.scale.px16} top ${styles.scale.px16};
	background-size: ${styles.scale.px24};
	color: ${styles.colors.darkGray};
	font-size: 18px;
	line-height: 50px;
	background-color: ${styles.colors.white};
	border-radius: 5px;
	padding: 0 ${styles.scale.px16};
	font-family: ${styles.fonts.avenirRegular};
	appearance: none;
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

const HeroSolid = () => {
	return (
		<div css={solidHeroCSS}>
			<h1>Find a local chapter</h1>
			<form action="">
				<label>Find a chapter in your community</label>
				<div css={inputCSS}>
					<input type="text" placeholder="Search by zip" />
					<button css={actionButtonCSS}>
						<NavArrow />
					</button>
				</div>
				<span>within</span>
				<select css={dropDownCSS} name="radius">
					<option value="15">15 Miles</option>
					<option value="15">25 Miles</option>
					<option value="15">50 Miles</option>
					<option value="15">100 Miles</option>
				</select>
				<button className="secondary-button">Search</button>
			</form>
		</div>
	)
}

export default HeroSolid
