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
						fluid(
							maxWidth: 600
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						) {
							...GatsbyDatoCmsFluid
						}
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
						fluid(
							maxWidth: 600
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						) {
							...GatsbyDatoCmsFluid
						}
					}
					description
				}
			}
		}
	}
`
