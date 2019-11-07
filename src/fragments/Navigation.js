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
						slug
					}
					... on DatoCmsRealStory {
						slug
					}
					... on DatoCmsChapterSearch {
						slug
					}
				}
				navigationItem {
					... on DatoCmsChildItem {
						childHeading
						childLink {
							... on DatoCmsLanding {
								slug
							}
							... on DatoCmsDetail {
								slug
							}
							... on DatoCmsChapterSearch {
								slug
							}
						}
						childExternalLink
					}
					... on DatoCmsFeaturedItem {
						featuredHeading
						featuredLink {
							... on DatoCmsLanding {
								slug
								seo {
									image {
										fluid(
											maxWidth: 1080
											imgixParams: {
												fm: "jpg"
												fit: "crop"
												crop: "faces"
												ar: 1.67
												w: "1080"
											}
										) {
											...GatsbyDatoCmsFluid_tracedSVG
										}
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
