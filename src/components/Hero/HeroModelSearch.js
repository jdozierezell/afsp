import React from 'react'
import { css } from '@emotion/core'
import Toggle from 'react-toggle'

import SolidArrow from '../SVGs/IconSolidArrow.svg'

import { styles } from '../../css/css'

import HeroModelSearchFormUs from './HeroModelSearchFormUs'
import HeroModelSearchFormNonUs from './HeroModelSearchFormNonUs'
// import Loadable from '@loadable/component'

// const HeroModelSearchFormUs = Loadable(() => import('./HeroModelSearchFormUs'))
// const HeroModelSearchFormNonUs = Loadable(() =>
// 	import('./HeroModelSearchFormNonUs')
// )

const solidHeroCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px160} ${styles.scale.px50};
	}
	h1,
	span {
		color: ${styles.colors.white};
	}
	h1 {
		margin: 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: ${styles.scale.px40} 0;
			font-size: ${styles.scale.px44};
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
	background-size: ${styles.scale.px24};
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
	margin: 0 ${styles.scale.px16};
`

const HeroModelSearch = ({
	title,
	description,
	searchType,
	handleSubmit,
	nonus,
	online,
	onlineGroups,
	radius,
	zip,
	country,
	updateRadius,
	updateZip,
	updateNonus,
	updateOnline,
	updateCountry,
	countryOptions,
}) => {
	return (
		<div css={solidHeroCSS}>
			<h1>{title}</h1>
			<div
				css={subHeaderCSS}
				dangerouslySetInnerHTML={{ __html: description }}
			></div>
			{searchType === 'supportGroup' && countryOptions.length > 0 && (
				<>
					<Toggle defaultChecked={nonus} onChange={updateNonus} />
					<label css={toggleLabelCSS} htmlFor="">
						Search outside the U.S.
					</label>
				</>
			)}
			{searchType === 'supportGroup' && onlineGroups.length > 0 && (
				<>
					<Toggle defaultChecked={online} onChange={updateOnline} />
					<label css={toggleLabelCSS} htmlFor="">
						Only list online groups
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
			{searchType === 'supportGroup' && nonus === false && (
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
			{searchType === 'supportGroup' && nonus === true && (
				<HeroModelSearchFormNonUs
					handleSubmit={handleSubmit}
					country={country}
					updateCountry={updateCountry}
					countryOptions={countryOptions}
					dropDownCSS={dropDownCSS}
				/>
			)}
		</div>
	)
}

export default HeroModelSearch
