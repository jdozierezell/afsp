import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroStatistics from '../components/Hero/HeroStatistics'
import StatisticsSummary from '../components/Statistics/StatisticsSummary'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import RecommendationsContentStories from '../components/Recommendations/RecommendationsContentStories'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

const SuicideStatistics = ({ data: { statistics } }) => {
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={statistics.seoMetaTags}
		>
			<HeroStatistics data={statistics} />
			<StatisticsSummary data={statistics} />
			<StatisticsContainer data={statistics} />
			{statistics.callsToAction.map((action, index) => {
				if (action.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							cta={action.cta.callToAction[0]}
						/>
					)
				} else if (action.__typename === 'DatoCmsContentStory') {
					return (
						<RecommendationsContentStories
							key={index}
							data={action}
						/>
					)
				} else if (action.__typename === 'DatoCmsResourceList') {
					return (
						<FeaturedResourcesContainer
							key={index}
							resources={action.resource}
							addCSS={css`
								background-color: ${styles.colors.lightGray};
							`}
						/>
					)
				} else {
					return ''
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
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			brief
			stateFactsYear
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
					resource {
						... on DatoCmsDetail {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
								}
							}
						}
						... on DatoCmsDetailTagged {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
								}
							}
						}
						... on DatoCmsLanding {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
								}
							}
						}
						... on DatoCmsQuilt {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
								}
							}
						}
					}
				}
				... on DatoCmsContentStory {
					__typename
					contentHeading
					content
					storiesHeading
					storyLink {
						title
						slug
						author {
							authorName
						}
					}
				}
			}
		}
	}
`
