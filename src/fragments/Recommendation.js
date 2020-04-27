import { graphql } from 'gatsby'

export const Recommendation = graphql`
	fragment Recommendation on DatoCmsRecommendation {
		video {
			title
			url
		}
		poster {
			url
			fluid(
				maxWidth: 1280
				imgixParams: {
					auto: "format"
					fit: "crop"
					crop: "faces"
					w: "1280"
					h: "720"
				}
			) {
				...GatsbyDatoCmsFluid_noBase64
			}
		}
		recommendationHeading
		storyRecommendation {
			__typename
			title
			slug
			author {
				authorName
			}
		}
	}
`
