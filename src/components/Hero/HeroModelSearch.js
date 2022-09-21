import React from 'react'
import { css } from '@emotion/react'
import Toggle from 'react-toggle'

import SolidArrow from '../SVGs/IconSolidArrow.svg'

import { styles } from '../../css/css'

import HeroModelSearchFormUs from './HeroModelSearchFormUs'
import HeroModelSearchFormNonUs from './HeroModelSearchFormNonUs'

const solidHeroCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px126} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px126} ${styles.scale.px50} ${styles.scale.px50};
	}
	li,
	h1,
	div {
		color: ${styles.colors.white};
		max-width: 623px;
		font-family: ${styles.fonts.avenirRegular};
	}
	h1 {
		margin: 0;
		color: ${styles.colors.white};
		font-size: ${styles.scale.px36};
		font-family: ${styles.fonts.paul};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: ${styles.scale.px40} 0;
			font-size: ${styles.scale.px44};
		}
	}
	label {
		font-family: ${styles.fonts.avenirRegular};
		font-size: ${styles.scale.px18};
		display: inline-block;
		margin: ${styles.scale.px20} 0;
		color: ${styles.colors.white};
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
	p,
	a {
		color: ${styles.colors.white};
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
	background-size: ${styles.scale.px16};
	color: ${styles.colors.darkGray};
	font-size: 18px;
	line-height: 50px;
	background-color: ${styles.colors.white};
	border-radius: 5px;
	padding: 0 ${styles.scale.px16};
	margin-top: ${styles.scale.px16};
	font-family: ${styles.fonts.avenirRegular};
	appearance: none;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: 0 ${styles.scale.px56} 0 ${styles.scale.px16};
	}
`

const toggleLabelCSS = css`
	color: ${styles.colors.white};
	vertical-align: text-bottom;
	padding: 0 ${styles.scale.px16} !important;
`

const toggleCSS = css`
	display: inline-block;
	position: relative;
	bottom: ${styles.scale.px20};
`

const HeroModelSearch = ({
	title,
	description,
	searchType,
	handleSubmit,
	handleUSSearchClick,
	handleNonUSSearchClick,
	nonus,
	virtual,
	virtualGroups,
	radius,
	zip,
	country,
	countryList,
	updateRadius,
	updateZip,
	updateNonus,
	updateVirtual,
	updateCountry,
}) => {
	return (
		<div css={solidHeroCSS}>
			<h1>{title}</h1>
			<div
				css={subHeaderCSS}
				dangerouslySetInnerHTML={{ __html: description }}
			></div>
			{searchType === 'supportGroup' &&
				countryList.length > 0 &&
				!virtual && (
					<>
						<span css={toggleCSS}>
							<Toggle
								id="nonus-group"
								defaultChecked={nonus}
								onChange={e => updateNonus(e)}
							/>
						</span>
						<label css={toggleLabelCSS} htmlFor="nonus-group">
							Search outside the U.S.
						</label>
					</>
				)}
			{searchType === 'supportGroup' && virtualGroups.length > 0 && (
				<>
					<span css={toggleCSS}>
						<Toggle
							id="virtual-group"
							defaultChecked={virtual}
							onChange={e => updateVirtual(e)}
						/>
					</span>
					<label css={toggleLabelCSS} htmlFor="virtual-group">
						List only nationwide virtual groups in the U.S.
					</label>
				</>
			)}
			{searchType === 'chapter' && (
				<HeroModelSearchFormUs
					handleSubmit={handleSubmit}
					radius={radius}
					zip={zip}
					updateRadius={updateRadius}
					updateZip={updateZip}
					dropDownCSS={dropDownCSS}
					inputCSS={inputCSS}
				/>
			)}
			{!virtual && searchType === 'supportGroup' && nonus === false && (
				<HeroModelSearchFormUs
					handleSubmit={handleUSSearchClick}
					radius={radius}
					zip={zip}
					updateRadius={updateRadius}
					updateZip={updateZip}
					dropDownCSS={dropDownCSS}
					inputCSS={inputCSS}
				/>
			)}
			{!virtual && searchType === 'supportGroup' && nonus === true && (
				<HeroModelSearchFormNonUs
					handleSubmit={handleNonUSSearchClick}
					country={country}
					updateCountry={updateCountry}
					countryList={countryList}
					dropDownCSS={dropDownCSS}
				/>
			)}
		</div>
	)
}

export default HeroModelSearch
