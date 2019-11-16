import React from 'react'
import { graphql } from 'gatsby'

const SuicideStatistics = ({ data: { statistics } }) => {
	console.log(statistics)
	return <div>Hello Keaton!!!!</div>
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
								linkText
								linkUrl
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
