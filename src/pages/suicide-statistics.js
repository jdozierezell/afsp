import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroStatistics from '../components/Hero/HeroStatistics'
import StatisticsSummary from '../components/Statistics/StatisticsSummary'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import RecommendationsContentStories from '../components/Recommendations/RecommendationsContentStories'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

const SuicideStatistics = ({ data: { statistics } }) => {
	statistics.stateData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/suicide-state-2018.csv',
	}
	statistics.ageData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/ratesbyage.csv',
	}
	statistics.raceData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/ratesbyethnicity.csv',
	}
	statistics.methodData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/ratesbymethod.csv',
	}

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
				video {
					mp4Url(res: medium)
				}
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
			ageBrief
			raceBrief
			methodBrief
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
				... on DatoCmsResourceList {
					__typename
					id
					resource {
						... on DatoCmsStory {
							__typename
							id
							title
							slug
							id
							coverImage {
								url
								alt
								fluid(
									maxWidth: 600
									imgixParams: {
										auto: "format"
										fill: "blur"
										fit: "fill"
										h: "370"
										w: "600"
									}
								) {
									...GatsbyDatoCmsFluid_noBase64
								}
							}
						}
						... on DatoCmsExternalResource {
							__typename
							id
							title
							resourceLink {
								... on DatoCmsExternalUrl {
									externalUrl
								}
								... on DatoCmsDownload {
									download {
										url
									}
								}
							}
							coverImage {
								url
								alt
								fluid(
									maxWidth: 600
									imgixParams: {
										auto: "format"
										fill: "blur"
										fit: "fill"
										h: "370"
										w: "600"
									}
								) {
									...GatsbyDatoCmsFluid_noBase64
								}
							}
						}
						... on DatoCmsCustomShareable {
							__typename
							id
							title
							slug
							id
							seo {
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsImageList {
							__typename
							id
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
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsDetailTagged {
							__typename
							id
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
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsQuilt {
							__typename
							id
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
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsSearchPage {
							__typename
							id
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
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsLanding {
							__typename
							id
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
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsDetail {
							__typename
							id
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
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
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
						__typename
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
