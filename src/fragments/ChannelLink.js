import { graphql } from 'gatsby'

export const ChannelLink = graphql`
	fragment ChannelLink on DatoCmsUnionForDatoCmsChannelChannelLink {
		... on DatoCmsInternalLink {
			__typename
			link {
				... on DatoCmsDetail {
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
				... on DatoCmsQuilt {
					__typename
					slug
				}
				... on DatoCmsDetailTagged {
					__typename
					slug
				}
				... on DatoCmsPartnerPage {
					__typename
					slug
				}
				... on DatoCmsGrantsPage {
					__typename
					slug
				}
				... on DatoCmsImageList {
					__typename
					slug
				}
				... on DatoCmsCustomShareable {
					__typename
					slug
				}
				... on DatoCmsNewRecord {
					__typename
					slug
				}
				... on DatoCmsEmbedPage {
					__typename
					slug
				}
			}
		}
		... on DatoCmsAnchor {
			__typename
			anchor
		}
	}
`
