import { graphql } from 'gatsby'

export const CTAs = graphql`
	fragment CTAs on DatoCmsCallToAction {
		cta {
			callToAction {
				... on DatoCmsCtaBackground {
					__typename
					backgroundVideo {
						url
					}
					backgroundImage {
						url
					}
					heading
					brief
					linkText
					external
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
						... on DatoCmsSearchPage {
							__typename
							slug
						}
						... on DatoCmsStatistic {
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
					external
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
						... on DatoCmsSearchPage {
							__typename
							slug
						}
						... on DatoCmsStatistic {
							__typename
							slug
						}
					}
				}
				... on DatoCmsCtaNoDescription {
					__typename
					heading
					linkText
					external
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
						... on DatoCmsSearchPage {
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
`
