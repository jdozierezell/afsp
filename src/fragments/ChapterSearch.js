import { graphql } from 'gatsby'

export const ChapterSearch = graphql`
	fragment ChapterSearch on DatoCmsChapterHomePageConnection {
		edges {
			node {
				id
				title
				slug
				chapterInformation {
					zipCode
				}
				heroPoster {
					url
					fluid(
						maxWidth: 200
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
							h: "360"
						}
					) {
						...GatsbyDatoCmsFluid
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
