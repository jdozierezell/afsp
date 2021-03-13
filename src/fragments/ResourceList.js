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
						gatsbyImageData(
							width: 600
							placeholder: NONE
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						)
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
						gatsbyImageData(
							width: 600
							placeholder: NONE
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						)
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
						gatsbyImageData(
							width: 600
							placeholder: NONE
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsStory {
				__typename
				title
				slug
				coverImage {
					url
					gatsbyImageData(
						width: 600
						placeholder: NONE
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
							h: "370"
						}
					)
				}
				seo {
					description
				}
			}
			... on DatoCmsExternalResource {
				__typename
				title
				slug: resourceLink {
					... on DatoCmsExternalUrl {
						externalUrl
					}
					... on DatoCmsDownload {
						download {
							url
						}
					}
				}
				coverImage {
					url
					gatsbyImageData(
						width: 600
						placeholder: NONE
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
							h: "370"
						}
					)
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
						gatsbyImageData(
							width: 600
							placeholder: NONE
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
		}
	}
`
