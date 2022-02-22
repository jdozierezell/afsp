import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import CTAContainer from '../CTAs/CTAContainer'

import Facts from './Facts'

import { styles } from '../../css/css'

const initiativesAndPlansCSS = css`
	h2 {
		font-size: ${styles.scale.px36};
	}
	max-width: 623px;
`

const factsWrapperCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px50} ${styles.scale.px50} 0;
	}
	@media (min-width: ${styles.screens.video}px) {
		width: calc(100vw - 575px);
	}
`
const stateFactsDownloadCSS = css`
	width: 100%;
`

const cta = {
	__typename: 'DatoCmsCtaWithDescription',
	heading: 'Advocate for suicide prevention',
	brief: 'Learn how our volunteer Field Advocates are helping to pass suicide prevention legislation and policies that can save lives',
	linkText: 'Learn more',
	link: {
		__typename: 'DatoCmsDetail',
		slug: 'advocate-for-suicide-prevention',
	},
}

const ContentFacts = ({ stateFacts }) => {
	return (
		<section css={factsWrapperCSS}>
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
			{stateFacts.initiativesAndPlans && (
				<div css={initiativesAndPlansCSS}>
					<h2>Plans and Initiatives</h2>
					<div
						dangerouslySetInnerHTML={{
							__html: stateFacts.initiativesAndPlans,
						}}
					></div>
				</div>
			)}
			<Facts
				state={stateFacts.stateName}
				facts={stateFacts.facts}
			></Facts>
			<CTAContainer cta={cta} />
		</section>
	)
}

export default ContentFacts
