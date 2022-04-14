import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'
import { sitewide } from '../../utils/sitewideVariables'

const solidFactsCSS = css`
	background-color: ${styles.colors.blue};
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px20};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px150} ${styles.scale.px50} ${styles.scale.px20};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: 1fr minmax(auto, 384px);
	}
`
const stateCSS = css`
	max-width: 600px;
	margin-right: ${styles.scale.px16};
	h1 {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px40} 0;
			font-size: ${styles.scale.px44};
		}
	}
	h4 {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.avenirRegular};
		line-height: ${styles.scale.px24};
		max-width: 623px;
		@media (min-width: ${styles.screens.video}px) {
			width: calc(100vw - 575px);
		}
	}
`

const HeroFacts = ({ stateFacts }) => {
	return (
		<div css={solidFactsCSS}>
			<div css={stateCSS}>
				<h1>{`${stateFacts.stateName} State Facts`}</h1>
				<h4>{`Learn more about suicide and prevention efforts in ${stateFacts.stateName}, including a list of laws enacted in AFSP's top priority areas.  Updated: ${sitewide.stateFactsUpdate}.`}</h4>
			</div>
		</div>
	)
}

export default HeroFacts
