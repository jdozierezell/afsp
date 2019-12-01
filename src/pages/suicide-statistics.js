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
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={statistics.seoMetaTags} />
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
				... on DatoCmsCtaLink {
					__typename
					link {
						callToAction {
							... on DatoCmsCtaWithDescription {
								__typename
								brief
								external
								linkText
								linkUrl
								link {
									... on DatoCmsTag {
										__typename
										slug
									}
									... on DatoCmsStory {
										__typename
										slug
									}
									... on DatoCmsDetail {
										__typename
										slug
									}
									... on DatoCmsAuthor {
										__typename
										slug
									}
									... on DatoCmsLanding {
										__typename
										slug
									}
									... on DatoCmsRealStory {
										__typename
										slug
									}
									... on DatoCmsChapterSearch {
										__typename
										slug
									}
									... on DatoCmsStatistic {
										__typename
										slug
									}
								}
							}
						}
					}
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
			callToAction1 {
				callToAction {
					... on DatoCmsCtaVideo {
						__typename
						videoUrl
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaNoDescription {
						__typename
						heading
						linkText
						linkUrl
					}
					... on DatoCmsCtaWithDescription {
						__typename
						heading
						brief
						linkText
						linkUrl
					}
				}
			}
			additionalContent
			relatedStories {
				title
				slug
			}
			callToAction2 {
				callToAction {
					... on DatoCmsCtaVideo {
						__typename
						videoUrl
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaNoDescription {
						__typename
						heading
						linkText
						linkUrl
					}
					... on DatoCmsCtaWithDescription {
						__typename
						heading
						brief
						linkText
						linkUrl
					}
				}
			}
		}
	}
`
