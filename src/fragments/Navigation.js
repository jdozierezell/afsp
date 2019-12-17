import { graphql } from 'gatsby'

export const Navigation = graphql`
	fragment Navigation on DatoCmsNavigationConnection {
		edges {
			node {
				id
				inHeader
				displayTitle
				displayLink {
					... on DatoCmsLanding {
						__typename
						slug
					}
					... on DatoCmsRealStory {
						__typename
						slug
					}
					... on DatoCmsChapterSearch {
						__typename
						slug
					}
				}
				navigationItem {
					... on DatoCmsChildItem {
						__typename
						childHeading
						childLink {
							... on DatoCmsLanding {
								__typename
								slug
							}
							... on DatoCmsDetail {
								__typename
								slug
							}
							... on DatoCmsChapterSearch {
								__typename
								slug
							}
						}
						childExternalLink
					}
					... on DatoCmsFeaturedItem {
						__typename
						featuredHeading
						featuredLink {
							... on DatoCmsLanding {
								__typename
								slug
								seo {
									image {
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
							}
						}
					}
				}
			}
		}
	}
`
