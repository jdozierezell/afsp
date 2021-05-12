import { graphql } from 'gatsby'

export const Recommendation = graphql`
	fragment Recommendation on DatoCmsRecommendation {
		__typename
		video {
			title
			url
		}
		poster {
			url
			gatsbyImageData(
				width: 1280
				placeholder: NONE
				imgixParams: {
					auto: "format"
					fit: "crop"
					crop: "faces"
					w: "1280"
					h: "720"
				}
			)
		}
		recommendationHeading
		storyRecommendation {
			__typename
			... on DatoCmsStory {
				__typename
				title
				slug
				author {
					authorName
				}
			}
			... on DatoCmsDetail {
				__typename
				title
				slug
			}
			... on DatoCmsCampaignLanding {
				__typename
				title
				slug
			}
		}
	}
`
