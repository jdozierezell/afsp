import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const solidFactsCSS = css`
	background-color: ${styles.colors.blue};
	display: grid;
	grid-template-columns: 1fr minmax(auto, 384px);
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px20};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px150} ${styles.scale.px50} ${styles.scale.px20};
	}
`
const stateCSS = css`
	max-width: 600px;
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
	}
`
const stateFactsDownloadCSS = css`
	width: 100%;
`

const HeroFacts = ({ stateFacts }) => {
	return (
		<div css={solidFactsCSS}>
			<div css={stateCSS}>
				<h1>{`${stateFacts.stateName} State Facts`}</h1>
				<h4>{`Learn more about suicide and the most up-to-date, local legislative efforts to prevent it in ${stateFacts.stateName}.`}</h4>
			</div>
			<div>
				<GatsbyImage
					image={stateFacts.stateFactSheetImage.gatsbyImageData}
					alt={stateFacts.stateFactSheetImage.alt}
					css={css`
						border: ${styles.scale.px5} solid ${styles.colors.white};
					`}
				></GatsbyImage>
				<a
					className="secondary-button"
					href={stateFacts.stateFactSheetUrl}
					css={stateFactsDownloadCSS}
				>
					Download Fact Sheet
				</a>
			</div>
		</div>
	)
}

export default HeroFacts
