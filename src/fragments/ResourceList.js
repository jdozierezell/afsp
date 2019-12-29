import { graphql } from 'gatsby'

export const ResourceList = graphql`
	fragment ResourceList on DatoCmsResourceList {
		resource {
			__typename
			... on DatoCmsLanding {
				__typename
				title
				slug
				seo {
					image {
						url
					}
					description
				}
			}
			... on DatoCmsDetail {
				__typename
				title
				slug
				brief
				seo {
					image {
						url
					}
				}
			}
		}
	}
`
