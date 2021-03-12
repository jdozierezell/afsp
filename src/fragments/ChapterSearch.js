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
						gatsbyImageData(
							width: 1080
							placeholder: NONE
							imgixParams: {
								auto: "format"
								fit: "fill"
								fill: "blur"
								w: "1080"
								h: "1080"
							}
						)
					}
				}
				heroPoster {
					url
					alt
					gatsbyImageData(
						width: 600
						placeholder: NONE
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
							h: "360"
						}
					)
				}
				staffName
				staffTitle
				staffEmail
				staffPhone
			}
		}
	}
`
