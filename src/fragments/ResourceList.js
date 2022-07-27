import { graphql } from 'gatsby'

export const ResourceList = graphql`
	fragment ResourceList on DatoCmsResourceList {
		__typename
		id
		listHeading
		displayAsCarousel
		randomize
		resource {
			... on DatoCmsStatistic {
				__typename
				id
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
								fit: "fill"
								fill: "blur"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsCustomShareable {
				__typename
				id
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
								fit: "fill"
								fill: "blur"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsDetail {
				__typename
				id
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
								fill: "blur"
								fit: "fill"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsDetailTagged {
				__typename
				id
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
								fill: "blur"
								fit: "fill"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsLanding {
				__typename
				id
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
								fill: "blur"
								fit: "fill"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsSearchPage {
				__typename
				id
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
								fill: "blur"
								fit: "fill"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsImageList {
				__typename
				id
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
								fill: "blur"
								fit: "fill"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsStory {
				__typename
				id
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
								fill: "blur"
								fit: "fill"
								w: "600"
								h: "370"
							}
						)
					}
				}
			}
			... on DatoCmsExternalResource {
				__typename
				id
				title
				externalDescription
				coverImage {
					url
					alt
					gatsbyImageData(
						width: 600
						placeholder: NONE
						imgixParams: {
							fill: "blur"
							fit: "fill"
							w: "600"
							h: "370"
						}
					)
				}
				resourceLink {
					... on DatoCmsExternalUrl {
						__typename
						id
						externalUrl
					}
					... on DatoCmsDownload {
						__typename
						id
						download {
							url
						}
					}
				}
			}
			... on DatoCmsQuilt {
				__typename
				id
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
								fill: "blur"
								fit: "fill"
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
