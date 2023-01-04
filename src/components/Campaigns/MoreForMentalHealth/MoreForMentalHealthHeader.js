import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../../css/css'

const bannerCSS = css`
	background-color: #342f7f;
	position: relative;
	color: ${styles.colors.white};
	padding: ${styles.scale.px24} ${styles.scale.px50};
	font-family: ${styles.fonts.gravity};
	font-size: ${styles.scale.px24};
	text-align: center;
	display: grid;
	justify-items: center;
	align-items: center;
	grid-template-columns: 1fr;
	grid-row-gap: ${styles.scale.px12};
	> div {
		max-width: 350px;
	}
	span:nth-of-type(1) {
		color: #00ffff;
	}
	span:nth-of-type(2) {
		color: #ff66ff;
	}
	span:nth-of-type(3) {
		color: #ffff00;
	}
	span:nth-of-type(4) {
		color: #a2ff00;
	}
	span:nth-of-type(5) {
		color: #ff396d;
	}
	a {
		display: inline-block;
		background-color: #00ffff;
		color: #3347ff;
		text-decoration: none;
		font-size: ${styles.scale.px20};
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
		> div {
			max-width: none;
		}
	}
	@media (min-width: ${styles.screens.video}px) {
		grid-template-columns: 1fr max-content max-content 1fr;
		> div {
			max-width: 350px;
			grid-column: 2 / 3;
		}
	}
	@media (min-width: ${styles.screens.footer}px) {
		grid-column-gap: ${styles.scale.px12};
		> div {
			max-width: none;
		}
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
