import React from 'react'
import { css } from '@emotion/react'

import CTAContainer from '../CTAs/CTAContainer'

import Facts from './Facts'

import { styles } from '../../css/css'

const sectionHeadingCSS = css`
	font-size: ${styles.scale.px36};
	margin: ${styles.scale.px40} 0 ${styles.scale.px35};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px46} 0 ${styles.scale.px40};
	}
`
const subSectionCSS = css`
	font-size: ${styles.scale.px24};
	margin: ${styles.scale.px36} 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px46} 0 ${styles.scale.px36};
	}
`
const subSubCSS = css`
	font-size: ${styles.scale.px20};
	margin: ${styles.scale.px24} 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px36} 0 ${styles.scale.px36};
	}
`
const keyCSS = css`
	list-style: none;
	margin: 0;
	@media (min-width: ${styles.screens.mobile}px) {
		display: grid;
		grid-column-gap: ${styles.gridGap.desktop};
		grid-template-columns: 1fr 1fr;
	}
	li {
		display: grid;
		grid-gap: ${styles.gridGap.desktop};
		grid-template-columns: ${styles.scale.px36} 1fr;
	}
`
const factListCSS = css`
	list-style: none;
	margin: 0;
	li {
		display: grid;
		grid-gap: ${styles.gridGap.desktop};
		grid-template-columns: ${styles.scale.px36} 1fr;
	}
`
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
			<CTAContainer cta={cta} />
			<Facts
				state={stateFacts.stateName}
				facts={stateFacts.facts}
			></Facts>
		</section>
	)
}

export default ContentFacts
