import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const heroStatisticsCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50} ${styles.scale.px80};
	}
	li,
	h1,
	div {
		color: ${styles.colors.white};
		max-width: 700px;
		font-family: ${styles.fonts.avenirRegular};
	}
	p,
	a {
		color: ${styles.colors.white};
	}
	h1 {
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: ${styles.scale.px40} 0;
			font-size: ${styles.scale.px44};
		}
	}
`

const calloutContainerCSS = css`
	width: 100%;
	max-width: initial !important;
	ul {
		list-style: none;
		margin: ${styles.scale.px24} 0 0;
		padding: 0;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: ${styles.gridGap.desktop};
		@media (min-width: ${styles.screens.video}px) {
			grid-template-columns: repeat(4, 1fr);
			margin: ${styles.scale.px30} 0 0;
		}
	}
	li {
		background: ${styles.colors.white};
		color: ${styles.colors.darkGray};
		border-radius: ${styles.scale.px5};
		padding: ${styles.scale.px16};
		min-height: ${styles.scale.px160};
		@media (min-width: ${styles.screens.tablet}px) {
			padding: ${styles.scale.px30};
		}
		h3 {
			font-size: ${styles.scale.px46};
			margin: ${styles.scale.px20} 0;
		}
	}
	li:last-of-type {
		background: ${styles.colors.darkGray};
		color: ${styles.colors.white};
		font-family: ${styles.fonts.avenirDemi};
		font-size: ${styles.scale.px17};
		display: flex;
		flex-flow: column wrap;
		justify-content: space-between;
		a {
			color: ${styles.colors.white};
		}
	}
`

const HeroStatistics = ({ data }) => {
	const { title, brief, statisticsCallouts } = data

	return (
		<div css={heroStatisticsCSS}>
			<h1>{title}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: brief,
				}}
			></div>
			<div css={calloutContainerCSS}>
				<ul>
					{statisticsCallouts.map((callout, index) => {
						if (callout.__typename === 'DatoCmsStatisticsCallout') {
							return (
								<li
									key={index}
									dangerouslySetInnerHTML={{
										__html: callout.callout,
									}}
								></li>
							)
						} else if (
							callout.__typename === 'DatoCmsCallToAction'
						) {
							const cta = callout.cta.callToAction[0]
							return (
								<li key={index}>
									<span>{cta.brief}</span>
									{cta.external && (
										<a href={cta.linkUrl}>{cta.linkText}</a>
									)}
									{!cta.external && (
										<Link
											to={buildUrl(
												cta.link.__typename,
												cta.link.slug
											)}
										>
											{cta.linkText}
										</Link>
									)}
								</li>
							)
						} else {
							return ''
						}
					})}
				</ul>
			</div>
		</div>
	)
}

export default HeroStatistics
