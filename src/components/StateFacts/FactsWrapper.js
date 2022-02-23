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
			<div css={initiativesAndPlansCSS}>
				<div>
					<GatsbyImage
						image={stateFacts.stateFactSheetImage.gatsbyImageData}
						alt={stateFacts.stateFactSheetImage.alt}
						css={css`
							border: ${styles.scale.px5} solid
								${styles.colors.white};
							max-width: 623px;
						`}
					></GatsbyImage>
					<a
						className="secondary-button"
						href={stateFacts.stateFactSheetUrl}
					>
						Download fact sheet
					</a>
				</div>
				{stateFacts.initiativesAndPlans && (
					<div>
						<h2>
							{stateFacts.stateName} suicide prevention plans and
							initiatives
						</h2>
						<div
							dangerouslySetInnerHTML={{
								__html: stateFacts.initiativesAndPlans,
							}}
						></div>
					</div>
				)}
			</div>
			<Facts
				state={stateFacts.stateName}
				facts={stateFacts.facts}
			></Facts>
			<CTAContainer cta={cta} />
		</section>
	)
}

export default ContentFacts
