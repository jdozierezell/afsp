import { graphql } from 'gatsby'

export const ChapterSearch = graphql`
	fragment ChapterSearch on DatoCmsChapterHomePageConnection {
		edges {
			node {
				title
				slug
				chapterInformation {
					zipCode
					chapterMap {
						url
						fluid(
							maxWidth: 1080
							imgixParams: {
								fm: "jpg"
								fit: "crop"
								crop: "faces"
								w: "1080"
								h: "645"
							}
						) {
							...GatsbyDatoCmsFluid
						}
					}
				}
				heroPoster {
					url
					fluid(
						maxWidth: 600
						imgixParams: {
							fm: "jpg"
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
