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
				}
				staffName
				staffTitle
				staffEmail
				staffPhone
			}
		}
	}
`
