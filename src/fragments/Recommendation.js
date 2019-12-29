import { graphql } from 'gatsby'

export const Recommendation = graphql`
	fragment Recommendation on DatoCmsRecommendation {
		video {
			title
			url
		}
		poster {
			url
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
