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
				}
			}
			... on DatoCmsStory {
				__typename
				title
				slug
				coverImage {
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
				seo {
					description
				}
			}
			... on DatoCmsExternalResource {
				__typename
				title
				slug: externalURL
				coverImage {
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
			}
			... on DatoCmsQuilt {
				__typename
				title
				slug
				seo {
					description
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
				}
			}
		}
	}
`
