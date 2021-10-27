import React from 'react'
import { css } from '@emotion/react'

import CTAContainer from '../CTAs/CTAContainer'
import CarouselDetailContainer from '../Carousels/CarouselDetailContainer'

import IconCircleCheck from '../SVGs/IconCircleCheck'
import IconCircleCircle from '../SVGs/IconCircleCircle'
import IconCircleX from '../SVGs/IconCircleX'

import Fact from './Fact.js'

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

const factWrapperCSS = css`
	position: relative;
`

const ctaContainerCSS = css`
	margin-left: -${styles.scale.px50};
	width: 100vw;
`

const detailContainerCSS = css`
	margin-left: -${styles.scale.px50};
	/* width: 100vw; */
`

const ContentFacts = ({ state, facts }) => {
	return (
		<div>
			<div>
				<h2 css={sectionHeadingCSS}>Legislation in {state}</h2>
				<h4>Key:</h4>
				<ul css={keyCSS}>
					<li>
						<IconCircleX
							color={styles.colors.poppy}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleX>
						<span>Legislation not in place</span>
					</li>
					<li>
						<IconCircleCheck
							color={styles.colors.green}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCheck>
						<span>Legislation in place</span>
					</li>
					<li>
						<IconCircleCircle
							color={styles.colors.yellow}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCircle>
						<span>Encouraged by legislation</span>
					</li>
					<li>
						<IconCircleCircle
							color={styles.colors.green}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCircle>
						<span>Required by legislation</span>
					</li>
				</ul>
			</div>
			{facts.map((fact, index) => {
				if (fact.public || fact.nonPublic) {
					return (
						<div key={index} css={factWrapperCSS}>
							<h3 id={fact.anchor} css={subSectionCSS}>
								{fact.display}
							</h3>
							{fact.public && (
								<>
									<h4 css={subSubCSS}>
										{fact.public.display}
									</h4>
									<ul css={factListCSS}>
										{fact.public.facts.map(
											(fact, index) => {
												return (
													<Fact
														fact={fact}
														key={index}
													></Fact>
												)
											}
										)}
									</ul>
								</>
							)}
							{fact.nonPublic && (
								<>
									<h4 css={subSubCSS}>
										{fact.nonPublic.display}
									</h4>
									<ul css={factListCSS}>
										{fact.nonPublic.facts.map(
											(fact, index) => {
												return (
													<Fact
														fact={fact}
														key={index}
													></Fact>
												)
											}
										)}
									</ul>
								</>
							)}
							{fact.promo &&
								fact.promo[0].__typename ===
									'DatoCmsCallsToAction' && (
									<CTAContainer
										key={index}
										number={index}
										cta={fact.promo[0].callToAction[0]}
										addCSS={ctaContainerCSS}
									/>
								)}
							{fact.promo &&
								fact.promo[0].__typename ===
									'DatoCmsDetail' && (
									<CarouselDetailContainer
										key={index}
										content={fact.promo[0]}
										addContainerCSS={detailContainerCSS}
									/>
								)}
						</div>
					)
				} else {
					return (
						<div key={index} css={factWrapperCSS}>
							<h3 id={fact.anchor} css={subSectionCSS}>
								{fact.display}
							</h3>
							<ul css={factListCSS}>
								{fact.facts.map((fact, index) => {
									return <Fact fact={fact} key={index}></Fact>
								})}
							</ul>
							{fact.promo &&
								fact.promo[0].__typename ===
									'DatoCmsCallsToAction' && (
									<CTAContainer
										key={index}
										number={index}
										cta={fact.promo[0].callToAction[0]}
										addCSS={ctaContainerCSS}
									/>
								)}
							{fact.promo &&
								fact.promo[0].__typename ===
									'DatoCmsDetail' && (
									<CarouselDetailContainer
										key={index}
										content={fact.promo[0]}
										addContainerCSS={detailContainerCSS}
									/>
								)}
						</div>
					)
				}
			})}
		</div>
	)
}

export default ContentFacts
