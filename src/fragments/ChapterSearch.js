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
						# fluid(
						# 	maxWidth: 1080
						# 	imgixParams: {
						# 		fm: "jpg"
						# 		fit: "crop"
						# 		crop: "faces"
						# 		ar: 1.67
						# 		w: "1080"
						# 	}
						# ) {
						# 	...GatsbyDatoCmsFluid_tracedSVG
						# }
					}
				}
				heroPoster {
					url
					# fluid(
					# 	maxWidth: 600
					# 	imgixParams: {
					# 		fm: "jpg"
					# 		fit: "crop"
					# 		crop: "faces"
					# 		w: "600"
					# 		ar: 1.67
					# 	}
					# ) {
					# 	...GatsbyDatoCmsFluid_tracedSVG
					# }
				}
				staffName
				staffTitle
				staffEmail
				staffPhone
			}
		}
	}
`
