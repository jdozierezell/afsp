import { graphql } from 'gatsby'

export const ChapterSearch = graphql`
	fragment ChapterSearch on DatoCmsChapterHomePageConnection {
		edges {
			node {
				title
				slug
				chapterZipCodeSet {
					zipCode
				}
				heroImage {
					fluid(
						maxWidth: 600
						imgixParams: {
							fm: "jpg"
							fit: "crop"
							crop: "faces"
							w: "600"
							ar: 1.67
						}
					) {
						...GatsbyDatoCmsFluid_tracedSVG
					}
				}
				staffName
				staffTitle
				staffEmail
				staffPhone
			}
		}
	}
`
