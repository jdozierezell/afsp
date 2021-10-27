import { graphql } from 'gatsby'

export const Detail = graphql`
	fragment Detail on DatoCmsDetail {
		title
		slug
		details {
			__typename
			... on DatoCmsContent {
				__typename
				id
				contentHeading
			}
			... on DatoCmsHeading {
				__typename
				id
				headingLevel
				heading
			}
		}
	}
`
