import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const solidFactsCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: flex-start;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50} ${styles.scale.px80};
	}
`
const stateNameCSS = css`
	max-width: 600px;
	color: ${styles.colors.white};
	font-family: ${styles.fonts.paul};
	margin: ${styles.scale.px35} 0;
	font-size: ${styles.scale.px36};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px40} 0;
		font-size: ${styles.scale.px44};
	}
`
const granteeInformationCSS = css`
	display: grid;
	width: 100%;
	grid-gap: ${styles.scale.px24};
	margin-top: ${styles.scale.px24};
	@media (min-width: ${styles.screens.navigation}px) {
		width: calc(100vw - 600px - 150px);
		margin-top: 0;
	}
	div {
		min-width: 100px;
		max-width: 200px;
		@media (min-width: ${styles.screens.navigation}px) {
			max-width: 360px;
		}
	}
	img {
		@media (min-width: ${styles.screens.navigation}px) {
			border-radius: 50%;
		}
	}
	p {
		text-align: left;
		color: ${styles.colors.white};
		direction: ltr;
		margin-bottom: 0;
		@media (min-width: ${styles.screens.navigation}px) {
			text-align: center;
		}
	}
`

const HeroFacts = ({ stateFacts }) => {
	return (
		<div css={solidFactsCSS}>
			<h1 css={stateNameCSS}>{`${stateFacts.stateName} State Facts`}</h1>
			<div></div>
		</div>
	)
}

export default HeroFacts
