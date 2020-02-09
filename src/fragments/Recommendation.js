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
				maxWidth: 600
				imgixParams: {
					auto: "format"
					fit: "crop"
					crop: "faces"
					w: "1920"
					h: "1080"
				}
			) {
				...GatsbyDatoCmsFluid
			}
		}
		storyRecommendation {
			title
			slug
			author {
				authorName
			}
		}
	}
`
