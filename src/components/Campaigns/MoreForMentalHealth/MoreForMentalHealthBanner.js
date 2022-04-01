import React, { useEffect } from 'react'
import { css } from '@emotion/react'

import { styles } from '../../../css/css'

const bannerCSS = css`
	background-color: #342f7f;
	position: relative;
	color: ${styles.colors.white};
	padding: ${styles.scale.px36} ${styles.scale.px50};
	font-family: ${styles.fonts.gravity};
	font-size: ${styles.scale.px60};
	line-height: ${styles.scale.px52};
	text-align: center;
	span:nth-of-type(1) {
		font-variation-settings: 'wdth' 96;
		color: #00ffff;
	}
	span:nth-of-type(2) {
		font-variation-settings: 'wdth' 150;
		color: #ff66ff;
	}
	span:nth-of-type(3) {
		font-variation-settings: 'wdth' 73;
		color: #ffff00;
	}
	span:nth-of-type(4) {
		font-variation-settings: 'wdth' 73;
		color: #a2ff00;
	}
	span:nth-of-type(5) {
		font-variation-settings: 'wdth' 110;
		color: #ff396d;
	}
	a {
		display: inline-block;
		background-color: #00ffff;
		color: #3347ff;
		text-decoration: none;
		line-height: ${styles.scale.px52};
		font-size: ${styles.scale.px24};
		padding: 0 ${styles.scale.px16};
		box-shadow: ${styles.scale.px5} ${styles.scale.px5} 0px #3347ff;
		transition: transform 100ms ease, box-shadow 100ms ease;
	}
	a:hover {
		font-family: ${styles.fonts.gravity};
		transform: translate(-2px, -2px);
		box-shadow: ${styles.scale.px7} ${styles.scale.px7} 0px #3347ff;
		background-color: #00ffff;
		color: #3347ff;
		text-decoration: none;
	}
	@media (min-width: ${styles.screens.tablet}px) {
		top: -${styles.scale.px50};
		margin-bottom: -${styles.scale.px50};
	}
	@media (min-width: ${styles.screens.video}px) {
		font-size: ${styles.scale.px75};
		line-height: ${styles.scale.px60};
	}
	@media (min-width: ${styles.screens.footer}px) {
	}
	@media (min-width: ${styles.screens.navigation}px) {
		font-size: ${styles.scale.px90};
		line-height: ${styles.scale.px80};
		padding-bottom: ${styles.scale.px30};
		a {
			position: relative;
			bottom: ${styles.scale.px18};
		}
	}
	@media (min-width: ${styles.screens.wide}px) {
	}
`

const MoreForMentalHealthBanner = () => {
	return (
		<div css={bannerCSS}>
			<div>
				<span>DEMAND</span> <span>MORE</span> <span>FOR</span>&nbsp;
				<span>MENTAL</span> <span>HEALTH</span>
			</div>
			<a
				href="https://moreformentalhealth.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				RAISE YOUR VOICE
			</a>
		</div>
	)
}

export default MoreForMentalHealthBanner
