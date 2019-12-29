import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroStatistics from '../components/Hero/HeroStatistics'
import StatisticsSummary from '../components/Statistics/StatisticsSummary'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import Recommendations from '../components/Recommendations/Recommendations'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

const additionalCSS = css`
	margin: 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px50};
	}
`

const SuicideStatistics = ({ data: { statistics } }) => {
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={statistics} />
			<HeroStatistics data={statistics} />
			<StatisticsSummary data={statistics} />
			<StatisticsContainer data={statistics} />
			<div
				css={additionalCSS}
				dangerouslySetInnerHTML={{
					__html: statistics.additionalContent,
				}}
			></div>
			{statistics.callsToAction.map((action, index) => {
				if (action.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							cta={action.cta.callToAction[0]}
						/>
					)
				} else if (action.__typename === 'DatoCmsRecommendation') {
					return (
						<Recommendations
							key={index}
							data={action.storyRecommendation}
						/>
					)
				} else if (action.__typename === 'DatoCmsResourceList') {
					return (
						<FeaturedResourcesContainer
							key={index}
							resources={action.resource}
						/>
					)
				}
			})}
		</Layout>
	)
}

export default SuicideStatistics

export const query = graphql`
	query {
		statistics: datoCmsStatistic {
			seoMetaTags {
				tags
			}
			title
			brief
			statisticsCallouts {
				__typename
				... on DatoCmsStatisticsCallout {
					callout
				}
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
			}
			additionalFacts {
				fact
			}
			video {
				url
			}
			videoPoster {
				url
			}
			videoHeader
			videoDescription
			videoLinkText
			videoLink {
				... on DatoCmsLanding {
					__typename
					slug
				}
				... on DatoCmsDetail {
					__typename
					slug
				}
			}
			stateData {
				url
			}
			ageData {
				url
			}
			ageBrief
			raceData {
				url
			}
			raceBrief
			methodData {
				url
			}
			methodBrief
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
				... on DatoCmsResourceList {
					__typename
					...ResourceList
				}
				... on DatoCmsRecommendation {
					__typename
					...Recommendation
				}
			}
			additionalContent
		}
	}
`
