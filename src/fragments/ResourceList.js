import { graphql } from 'gatsby'

export const ResourceList = graphql`
	fragment ResourceList on DatoCmsResourceList {
		resource {
			... on DatoCmsDetail {
				__typename
				title
				slug
				seo {
					description
					image {
						url
						# fluid(
						# 	maxWidth: 600
						# 	imgixParams: {
						# 		auto: "format"
						# 		fit: "crop"
						# 		crop: "faces"
						# 		w: "600"
						# 		h: "370"
						# 	}
						# ) {
						# 	...GatsbyDatoCmsFluid
						# }
					}
				}
			}
			... on DatoCmsDetailTagged {
				__typename
				title
				slug
				seo {
					description
					image {
						url
						# fluid(
						# 	maxWidth: 600
						# 	imgixParams: {
						# 		auto: "format"
						# 		fit: "crop"
						# 		crop: "faces"
						# 		w: "600"
						# 		h: "370"
						# 	}
						# ) {
						# 	...GatsbyDatoCmsFluid
						# }
					}
				}
			}
			... on DatoCmsLanding {
				__typename
				title
				slug
				seo {
					description
					image {
						url
						# fluid(
						# 	maxWidth: 600
						# 	imgixParams: {
						# 		auto: "format"
						# 		fit: "crop"
						# 		crop: "faces"
						# 		w: "600"
						# 		h: "370"
						# 	}
						# ) {
						# 	...GatsbyDatoCmsFluid
						# }
					}
				}
			}
			... on DatoCmsQuilt {
				__typename
				title
				slug
				seo {
					description
					image {
						url
						# fluid(
						# 	maxWidth: 600
						# 	imgixParams: {
						# 		auto: "format"
						# 		fit: "crop"
						# 		crop: "faces"
						# 		w: "600"
						# 		h: "370"
						# 	}
						# ) {
						# 	...GatsbyDatoCmsFluid
						# }
					}
				}
			}
		}
	}
`
