import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroStatistics from '../components/Hero/HeroStatistics'
import StatisticsSummary from '../components/Statistics/StatisticsSummary'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'

import { styles } from '../css/css'

const SuicideStatistics = ({ data: { statistics } }) => {
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={statistics} />
			<HeroStatistics data={statistics} />
			<StatisticsSummary data={statistics} />
			<StatisticsContainer data={statistics} />
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
					parentPage {
						... on DatoCmsLanding {
							__typename
							slug
						}
						... on DatoCmsDetail {
							__typename
							slug
							parentPage {
								... on DatoCmsLanding {
									__typename
									slug
								}
								... on DatoCmsDetail {
									__typename
									slug
									parentPage {
										... on DatoCmsDetail {
											__typename
											slug
										}
									}
								}
							}
						}
					}
				}
			}
			videoUrl
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
			}
			additionalContent
			relatedStories {
				title
				slug
			}
		}
	}
`
