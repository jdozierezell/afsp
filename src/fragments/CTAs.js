import { graphql } from 'gatsby'

export const CTAs = graphql`
	fragment CTAs on DatoCmsCallToAction {
		cta {
			callToAction {
				... on DatoCmsCtaBackground {
					__typename
					backgroundVideo {
						alt
						url
						video {
							mp4Url(res: medium)
						}
					}
					backgroundImage {
						url
						gatsbyImageData(
							width: 1920
							placeholder: NONE
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "1920"
								h: "1080"
								q: 30
							}
						)
					}
					heading
					brief
					linkText
					file
					fileAsset {
						url
					}
					external
					linkUrl
					link {
						... on DatoCmsActionCenter {
							__typename
							slug
						}
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
						... on DatoCmsDetailTagged {
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
						... on DatoCmsSearchPage {
							__typename
							slug
						}
						... on DatoCmsStatistic {
							__typename
							slug
						}
						... on DatoCmsGrantsPage {
							__typename
							slug
						}
						... on DatoCmsCampaignLanding {
							__typename
							slug
						}
						... on DatoCmsCalendar {
							__typename
							slug
						}
					}
				}
				... on DatoCmsCtaWithDescription {
					__typename
					heading
					brief
					linkText
					file
					fileAsset {
						url
					}
					external
					linkUrl
					link {
						... on DatoCmsActionCenter {
							__typename
							slug
						}
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
						... on DatoCmsDetailTagged {
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
						... on DatoCmsSearchPage {
							__typename
							slug
						}
						... on DatoCmsStatistic {
							__typename
							slug
						}
						... on DatoCmsGrantsPage {
							__typename
							slug
						}
						... on DatoCmsCampaignLanding {
							__typename
							slug
						}
						... on DatoCmsCalendar {
							__typename
							slug
						}
					}
				}
				... on DatoCmsCtaNoDescription {
					__typename
					heading
					linkText
					file
					fileAsset {
						url
					}
					external
					linkUrl
					link {
						... on DatoCmsActionCenter {
							__typename
							slug
						}
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
						... on DatoCmsDetailTagged {
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
						... on DatoCmsSearchPage {
							__typename
							slug
						}
						... on DatoCmsStatistic {
							__typename
							slug
						}
						... on DatoCmsGrantsPage {
							__typename
							slug
						}
						... on DatoCmsCampaignLanding {
							__typename
							slug
						}
						... on DatoCmsCalendar {
							__typename
							slug
						}
					}
				}
			}
		}
	}
`
