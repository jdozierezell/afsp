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
				... on DatoCmsStatisticsCallout {
					callout
				}
				... on DatoCmsCtaLink {
					link {
						callToAction {
							... on DatoCmsCtaWithDescription {
								brief
								external
								linkText
								linkUrl
								link {
									... on DatoCmsTag {
										slug
									}
									... on DatoCmsStory {
										slug
									}
									... on DatoCmsDetail {
										slug
									}
									... on DatoCmsAuthor {
										slug
									}
									... on DatoCmsLanding {
										slug
									}
									... on DatoCmsRealStory {
										slug
									}
									... on DatoCmsChapterSearch {
										slug
									}
									... on DatoCmsStatistic {
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
					slug
				}
				... on DatoCmsDetail {
					slug
					parentPage {
						... on DatoCmsLanding {
							slug
						}
						... on DatoCmsDetail {
							slug
							parentPage {
								... on DatoCmsLanding {
									slug
								}
								... on DatoCmsDetail {
									slug
									parentPage {
										... on DatoCmsDetail {
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
						videoUrl
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaNoDescription {
						heading
						linkText
						linkUrl
					}
					... on DatoCmsCtaWithDescription {
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
						videoUrl
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaNoDescription {
						heading
						linkText
						linkUrl
					}
					... on DatoCmsCtaWithDescription {
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
