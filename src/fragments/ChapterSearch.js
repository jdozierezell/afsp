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
					chapterMap {
						url
						fluid(
							maxWidth: 1080
							imgixParams: {
								auto: "format"
								fit: "fill"
								fill: "blur"
								w: "1080"
								h: "1080"
							}
						) {
							...GatsbyDatoCmsFluid
						}
					}
				}
				heroPoster {
					url
					alt
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
